import {
    attack,
    initiative,
    getCombatStatus,
    getNextCharacterIndex,
    generateCombatResultPoints
} from 'libs/systems/combatSystem'
import { calculateDamage } from 'libs/systems/damageSystem'
import { findTarget } from 'libs/systems/aiSystem'
import { generateCombatSentence } from 'libs/systems/textGeneratorSystem'
import { newParty } from 'libs/systems/playerSystem'

import { getCombat, getHeroById } from 'libs/data/accessors'
import { createMount } from 'libs/data/factories'

import { PLAYER_ID } from 'libs/data/static/heroes'

import type {
    Combatant,
    CombatStatus,
    Enemy,
    Hero,
    Mount,
    Team,
    WinCondition
} from 'libs/entities'
import { validatePlayerName } from 'libs/systems/validationSystem'

class GameStore {
    private availableHeroIds: string[]
    private charactersOrdered: Combatant[]
    private combatId: string
    private Log: Map<string, { status: CombatStatus; value: number }>
    private combatStatus: CombatStatus
    private currentCharacterIndex: number
    private currentHeroParty: Hero[]
    private currentMounts: Mount[]
    private turnLog: string[]
    private winConditions: WinCondition

    constructor(playerName: string) {
        validatePlayerName(playerName)

        const player = getHeroById(PLAYER_ID)
        player.name = playerName

        this.availableHeroIds = [PLAYER_ID, 'hero_0002']
        this.charactersOrdered = []
        this.combatId = ''
        this.Log = new Map()
        this.combatStatus = getCombatStatus()
        this.currentCharacterIndex = 0
        this.currentHeroParty = [player]
        this.currentMounts = []
        this.turnLog = []
        this.winConditions = []
    }

    private adjustNameLength(name: string, spaceSize: number = 20) {
        return name + '\u00A0'.repeat(spaceSize - name.length)
    }
    // TODO: Implement a robust action management system once additional actions are created
    private attackAction(attacker: Combatant, target: Combatant) {
        const attackResult = attack(attacker, target)
        const damageResult = { damage: 0, oldHp: 0, newHp: 0, stillAlive: true }

        if (attackResult.success) {
            damageResult.damage = calculateDamage(
                attacker,
                attackResult.critical
            )
            damageResult.oldHp = target.hp
            damageResult.newHp = target.hp - damageResult.damage
            // NOTE: Direct HP access on Character (simplicity)
            // TODO: Migrate to HealthSystem for damage/healing management
            target.hp -= damageResult.damage
            if (target.hp <= 0) {
                target.isAlive = false
                damageResult.stillAlive = false
            }
        }
        const combatMessage = generateCombatSentence(
            attacker,
            target,
            attackResult,
            damageResult
        )

        this.turnLog.push(combatMessage)
    }
    private endCombat() {
        const combatResultPoints = generateCombatResultPoints(
            [...this.charactersOrdered, ...this.currentMounts],
            this.combatStatus,
            this.winConditions
        )
        this.Log.set(this.combatId, {
            status: this.combatStatus,
            value: combatResultPoints
        })
        this.resetVariables()
    }
    private runInitiative(heroParty: Hero[], enemyParty: Enemy[]) {
        this.charactersOrdered = initiative([...heroParty, ...enemyParty]).map(
            char => {
                const hero = heroParty.find(hero => hero.id === char.id)
                const enemy = enemyParty.find(enemy => enemy.id === char.id)

                if (hero) return hero
                if (enemy) return enemy

                throw new Error('Fail to order the characters')
            }
        )
    }
    private resetVariables() {
        this.charactersOrdered = []
        this.combatId = ''
        this.combatStatus = getCombatStatus()
        this.currentCharacterIndex = 0
        // TODO: Filter mounts by availability
        this.currentMounts = this.currentMounts.filter(mount => mount.isAlive)
        this.turnLog = []
        this.winConditions = []
    }

    // eslint-disable-next-line
    public handleInkFunction(funcName: string, ...args: any[]) {
        switch (funcName) {
            case 'add_mount': {
                const [mountName, characterId, characterTeam] = args as [
                    string,
                    string,
                    Team
                ]
                const mount = createMount(mountName, characterId, characterTeam)

                this.currentMounts.push(mount)

                break
            }
            case 'add_to_hero_party': {
                const [heroId] = args as [string]

                this.currentHeroParty = newParty(
                    this.currentHeroParty,
                    this.availableHeroIds,
                    heroId
                )

                break
            }
            case 'ai_action': {
                const attacker =
                    this.charactersOrdered[this.currentCharacterIndex]
                const target = findTarget(attacker, [
                    ...this.charactersOrdered,
                    ...this.currentMounts
                ])

                this.attackAction(attacker, target)

                break
            }
            case 'attack': {
                const [targetId] = args as [string]
                const target = this.charactersOrdered.find(
                    character => character.id === targetId
                )
                const attacker =
                    this.charactersOrdered[this.currentCharacterIndex]

                if (!target) {
                    throw new Error(
                        `Unable to find target: ${JSON.stringify(target)}.`
                    )
                }

                this.attackAction(attacker, target)

                break
            }
            case 'end_turn': {
                this.combatStatus = getCombatStatus(this.charactersOrdered)

                if (this.combatStatus === 'IN_PROGRESS') {
                    this.currentCharacterIndex = getNextCharacterIndex(
                        this.charactersOrdered,
                        this.currentCharacterIndex
                    )
                } else {
                    this.endCombat()
                }

                break
            }
            case 'get_action_result': {
                const [reverseIndex] = args as [number]

                const lastLogIndex = this.turnLog.length - 1 - reverseIndex
                const lastLog = this.turnLog[lastLogIndex]

                if (lastLogIndex >= 0) {
                    return `${lastLogIndex + 1}. ${lastLog}`
                }

                return ''
            }
            case 'get_alive_characters_size': {
                return this.charactersOrdered.filter(
                    character => character.isAlive
                ).length
            }
            case 'get_character_info': {
                const [teamName, index, prop] = args as [Team, number, string]
                const character = this.charactersOrdered
                    .filter(character => character.team === teamName)
                    .find((character, i) => i === index && prop in character)

                if (character && prop in character) {
                    const value = character[prop as keyof typeof character]

                    if (prop === 'name' && typeof value === 'string') {
                        return this.adjustNameLength(value)
                    }

                    return value
                }

                throw new Error(
                    `get_character_info error! check: ${teamName} - ${index} - ${prop}`
                )
            }
            case 'get_combat_result': {
                const [combatId] = args as [string]

                if (this.Log.has(combatId)) {
                    const combatResult = this.Log.get(combatId)

                    return combatResult?.value
                }

                throw Error(`Invalid combatId: ${combatId}.`)
            }
            case 'get_combat_round': {
                if (this.turnLog.length === 0) {
                    return 1
                }
                const aliveCharacters = this.charactersOrdered.filter(
                    character => character.isAlive
                )

                return Math.ceil(this.turnLog.length / aliveCharacters.length)
            }
            case 'get_combat_status': {
                return this.combatStatus
            }
            case 'get_mount_info': {
                const [characterId, prop] = args as [string, string]

                const mount = this.currentMounts.find(
                    mount => mount.ownerId === characterId
                )

                if (mount && prop in mount) {
                    const value = mount[prop as keyof typeof mount]

                    if (prop === 'name' && typeof value === 'string') {
                        return this.adjustNameLength(value)
                    }

                    return value
                }

                return 0
            }
            case 'get_party_size': {
                const [teamName] = args as [Team]
                const team = this.charactersOrdered.filter(
                    character => character.team === teamName
                )

                return team.length
            }
            case 'get_player_name': {
                return this.currentHeroParty.find(hero => hero.isPlayer)?.name
            }
            case 'has_mounts': {
                const [teamName] = args as [Team]

                return this.currentMounts.some(
                    mount => mount.team === teamName && mount.hp > 0
                )
            }
            case 'is_player_action': {
                const isPlayerTurn =
                    this.charactersOrdered[this.currentCharacterIndex].id ===
                    PLAYER_ID

                return isPlayerTurn
            }
            case 'set_combat': {
                const [combatId] = args as [string]
                const { enemies, winConditions } = getCombat(
                    combatId,
                    this.currentHeroParty
                )

                this.runInitiative(this.currentHeroParty, enemies)
                this.combatStatus = getCombatStatus(this.charactersOrdered)
                this.combatId = combatId
                this.winConditions = winConditions

                break
            }
            default: {
                throw new Error(`Unhandled function: ${funcName}`)
            }
        }
    }
}

export default GameStore
