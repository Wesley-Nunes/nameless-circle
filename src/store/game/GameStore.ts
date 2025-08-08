import { attack, initiative, getCombatStatus, getNextCharacterIndex, generateCombatResultPoints } from 'libs/systems/combatSystem'
import { calculateDamage } from 'libs/systems/damageSystem'
import { findTarget } from 'libs/systems/aiSystem'
import { generateCombatSentence } from 'libs/systems/textGeneratorSystem'
import { newParty } from 'libs/systems/playerSystem'

import { getCombat, getHeroById } from 'libs/data/accessors'
import { createMount } from 'libs/data/factories'

import { PLAYER_ID } from 'libs/data/static/heroes'

import type { Combatant, CombatStatus, Enemy, Hero, Mount, Team, WinCondition } from 'libs/entities'

type Args = ([] | [string] | [string, string, Team] | [string, number, string])

class GameStore {
    private availableHeroIds: string[]
    private charactersOrdered: Combatant[]
    private combatId: string
    private combatLog: Map<string, { combatStatus: CombatStatus, value: number }>
    private combatStatus: CombatStatus
    private currentCharacterIndex: number
    private currentHeroParty: Hero[]
    private currentMounts: Mount[]
    private turnLog: string[]
    private winConditions: WinCondition


    constructor() {
        this.availableHeroIds = [PLAYER_ID, 'hero_0002']
        this.charactersOrdered = []
        this.combatId = ''
        this.combatLog = new Map()
        this.combatStatus = getCombatStatus()
        this.currentCharacterIndex = 0
        this.currentHeroParty = [getHeroById(PLAYER_ID)]
        this.currentMounts = []
        this.turnLog = []
        this.winConditions = []
    }

    // NOTE: It should be moved to a proper system after create more action
    private attackAction(attacker: Combatant, target: Combatant) {
        const attackResult = attack(attacker, target)

        if (attackResult.hit) {
            const damage = calculateDamage(attacker, attackResult.critical)
            // NOTE: HP is currently decreased directly from the Character object 
            // for simplicity. This will be handled by a dedicated HP system later.
            target.hp -= damage
            if (target.hp <= 0) {
                target.isAlive = false
            }
        }
        const combatMessage = generateCombatSentence(attacker, target, attackResult)

        this.turnLog.push(combatMessage)
    }
    private endCombat() {
        const combatResultPoints = generateCombatResultPoints(
            [...this.charactersOrdered, ...this.currentMounts],
            this.combatStatus,
            this.winConditions
        )
        this.combatLog.set(
            this.combatId,
            {
                combatStatus: this.combatStatus,
                value: combatResultPoints
            }
        )

        this.charactersOrdered = []
        this.combatId = ''
        this.combatStatus = 'UNINITIALIZED'
        this.currentCharacterIndex = 0
        // NOTE: The filter of the mounts should be improved 
        // based on mounts availability
        this.currentMounts = this.currentMounts.filter(mount => mount.isAlive)
        this.turnLog = []
    }
    private runInitiative(heroParty: Hero[], enemyParty: Enemy[]) {
        this.charactersOrdered = initiative([...heroParty, ...enemyParty])
            .map((char) => {
                const hero = heroParty.find(hero => hero.id === char.id)
                const enemy = enemyParty.find(enemy => enemy.id === char.id)

                if (hero) return hero
                if (enemy) return enemy

                throw new Error('Fail to order the characters')
            })
    }
    private stringifyWithMarker(characters: Combatant[], i: number): string {
        return characters
            .map((character, index) => {
                if (character.hp <= 0) {
                    return `\u{1F480} - ${character.name}`
                }

                return index === i
                    ? `\u{2694}\u{FE0F} ${character.name}`
                    : `\u{23F3} ${character.name}`
            }).join(' / ')
    }

    public handleInkFunction(funcName: string, ...args: Args) {
        switch (funcName) {
            case 'add_mount': {
                const [
                    mountName, characterId, characterTeam
                ] = args as [string, string, Team]
                const mount = createMount(mountName, characterId, characterTeam)

                this.currentMounts.push(mount)

                break
            }
            case 'add_to_hero_party': {
                const [heroId] = args as [string]

                this.currentHeroParty = newParty(
                    this.currentHeroParty, this.availableHeroIds, heroId
                )

                break
            }
            case 'ai_action': {
                const attacker = this.charactersOrdered[this.currentCharacterIndex]
                const target = findTarget(
                    attacker,
                    [...this.charactersOrdered, ...this.currentMounts]
                )

                this.attackAction(attacker, target)

                break
            }
            case 'attack': {
                const attacker = this.charactersOrdered[this.currentCharacterIndex]
                const [targetId] = args
                const target = this.charactersOrdered
                    .find(character => character.id === targetId)

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
                        this.charactersOrdered, this.currentCharacterIndex
                    )
                } else {
                    this.endCombat()
                }

                break
            }
            case 'get_action_order': {
                const initiativeStringified = this.stringifyWithMarker(
                    this.charactersOrdered, this.currentCharacterIndex
                )

                return initiativeStringified
            }
            case 'get_action_result': {
                const lastLogIndex = this.turnLog.length - 1
                const lastLog = this.turnLog[lastLogIndex]

                return lastLog
            }
            case 'get_character_info': {
                const [teamName, index, prop] = args
                const character = this.charactersOrdered
                    .filter(character => character.team === teamName)
                    .find((character, i) => (
                        i === index && prop && prop in character)
                    )

                if (character && prop && prop in character) {
                    const value = character[prop as keyof typeof character]

                    return value
                }

                throw new Error(
                    `get_character_info error! check: ${teamName} - ${index} - ${prop}`
                )
            }
            case 'get_combat_result': {
                const [combatId] = args

                if (combatId && this.combatLog.has(combatId)) {
                    const combatResult = this.combatLog.get(combatId)

                    return combatResult?.value
                }

                throw Error(`Invalid combatId: ${combatId}.`)
            }
            case 'get_combat_status': {
                return this.combatStatus
            }
            case 'get_mount_info': {
                const [teamName, index, prop] = args

                const mount = this.currentMounts
                    .filter(mount => mount.team === teamName)
                    .find((mount, i) => (
                        i === index && prop && prop in mount)
                    )

                if (mount && prop && prop in mount) {
                    const value = mount[prop as keyof typeof mount]

                    return value
                }

                return false
            }
            case 'get_party_size': {
                const [teamName] = args
                const team = this.charactersOrdered.filter(
                    character => character.team === teamName
                )

                return team.length
            }
            case 'has_mounts': {
                const [teamName] = args

                return this.currentMounts.some(mount =>
                    (mount.team === teamName && mount.hp > 0)
                )
            }
            case 'is_player_action': {
                const isPlayerTurn = (
                    this.charactersOrdered[this.currentCharacterIndex].id === PLAYER_ID
                )

                return isPlayerTurn
            }
            case 'set_combat': {
                const [combatId] = args as [string]
                const { enemies, winConditions } = getCombat(combatId, this.currentHeroParty)

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

