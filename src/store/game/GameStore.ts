import {
    attack,
    initiative,
    getCombatStatus,
    getNextCharacterIndex,
    generateCombatResultPoints
} from 'libs/systems/combatSystem'
import { calculateDamage } from 'libs/systems/damageSystem'
import { findTarget } from 'libs/systems/aiSystem'
import {
    generateAttemptSkillSentence,
    generateCombatSentence
} from 'libs/systems/textGeneratorSystem'
import { newParty } from 'libs/systems/playerSystem'
import { getSkillSceneModifier } from 'libs/systems/abilitySystem'
import { attemptSkill } from 'libs/systems/skillSystem'

import { getCombat, getHeroById, getSkillScene } from 'libs/data/accessors'
import { createMount } from 'libs/data/factories'

import { PLAYER_ID } from 'libs/data/static/heroes'

import type {
    Combatant,
    CombatStatus,
    Enemy,
    Hero,
    Mount,
    Skill,
    SkillSceneProgression,
    SkillSceneReward,
    Team,
    WinCondition
} from 'libs/entities'

class GameStore {
    private availableHeroIds: string[]
    private availableSceneSkills: SkillSceneProgression[]
    private attemptSkillCount: { SUCCESS: number; FAIL: number }
    private charactersOrdered: Combatant[]
    private combatId: string
    private Log: Map<string, { status: CombatStatus; value: number }>
    private combatStatus: CombatStatus
    private currentCharacterIndex: number
    private currentHeroParty: Hero[]
    private currentMounts: Mount[]
    private lastAttemptSkillResult: 'NONE' | 'SUCCESS' | 'FAIL'
    private skillSceneModifier: number
    private skillSceneReward: SkillSceneReward
    private skillSceneTurn: number
    private skillSceneId: string
    private turnLog: string[]
    private winConditions: WinCondition

    constructor() {
        this.availableHeroIds = [PLAYER_ID, 'hero_0002']
        this.availableSceneSkills = []
        this.attemptSkillCount = { SUCCESS: 0, FAIL: 0 }
        this.charactersOrdered = []
        this.combatId = ''
        this.Log = new Map()
        this.combatStatus = getCombatStatus()
        this.currentCharacterIndex = 0
        this.currentHeroParty = [getHeroById(PLAYER_ID)]
        this.currentMounts = []
        this.lastAttemptSkillResult = 'NONE'
        this.skillSceneId = ''
        this.skillSceneReward = { type: '', items: [] }
        this.skillSceneModifier = 0
        this.skillSceneTurn = 0
        this.turnLog = []
        this.winConditions = []
    }

    private adjustNameLength(name: string, spaceSize: number = 40) {
        return name + '\u00A0'.repeat(spaceSize - name.length)
    }
    // TODO: Implement a robust action management system once additional actions are created
    private attackAction(attacker: Combatant, target: Combatant) {
        const attackResult = attack(attacker, target)

        if (attackResult.success) {
            const damage = calculateDamage(attacker, attackResult.critical)
            // NOTE: Direct HP access on Character (simplicity)
            // TODO: Migrate to HealthSystem for damage/healing management
            target.hp -= damage
            if (target.hp <= 0) {
                target.isAlive = false
            }
        }
        const combatMessage = generateCombatSentence(
            attacker,
            target,
            attackResult
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
    private endSkillScene() {
        const successCount = this.attemptSkillCount.SUCCESS
        const failCount = this.attemptSkillCount.FAIL
        const status = successCount > failCount ? 'VICTORY' : 'DEFEAT'
        let value = 0

        if (successCount > failCount) {
            value++
            // TODO: Implement mount system
            if (
                this.skillSceneReward.type === 'mounts' &&
                this.skillSceneReward.items.length <=
                    this.availableHeroIds.length
            ) {
                this.skillSceneReward.items.forEach((mountName, i) => {
                    const mount = createMount(
                        mountName,
                        this.availableHeroIds[i],
                        'heroes'
                    )
                    this.currentMounts.push(mount)
                })
            }
        } else if (failCount > successCount) {
            value--
            // TODO: Blocked by deities' story development
            // When the player fails in a skill scene,
            // a deity will mark them for later attention.
        } else {
            throw new Error(
                `Skill scene cannot resolve: equal number of successes and failures ` +
                    `(SUCCESS: ${successCount}, FAIL: ${failCount}). ` +
                    `Design requires a clear outcome.`
            )
        }

        this.Log.set(this.skillSceneId, {
            status,
            value
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
        this.availableSceneSkills = []
        this.attemptSkillCount = { SUCCESS: 0, FAIL: 0 }
        this.charactersOrdered = []
        this.combatId = ''
        this.combatStatus = getCombatStatus()
        this.currentCharacterIndex = 0
        // TODO: Filter mounts by availability
        this.currentMounts = this.currentMounts.filter(mount => mount.isAlive)
        this.lastAttemptSkillResult = 'NONE'
        this.skillSceneId = ''
        this.skillSceneReward = { type: '', items: [] }
        this.skillSceneModifier = 0
        this.skillSceneTurn = 0
        this.turnLog = []
        this.winConditions = []
    }
    private stringifyWithMarker(characters: Combatant[], i: number): string {
        return characters
            .map((character, index) => {
                if (character.hp <= 0) {
                    return `\u{1FAA6} - ${character.name}`
                }

                return index === i
                    ? `\u{25B6} ${character.name}`
                    : `\u{23F3} ${character.name}`
            })
            .join(' / ')
    }

    // eslint-disable-next-line
    public handleInkFunction(funcName: string, ...args: any[]) {
        switch (funcName) {
            case 'attempt_skill': {
                const [skillId] = args as [string]
                const character =
                    this.charactersOrdered[this.currentCharacterIndex]
                const skill = character.actions.find(
                    action =>
                        typeof action === 'object' && action.id === skillId
                ) as Skill
                const dc = this.availableSceneSkills.find(
                    sceneSkill => sceneSkill.turn === this.skillSceneTurn
                )?.dc
                const allyModifier = this.skillSceneModifier
                const skillAttemptResult = attemptSkill(
                    character,
                    skill,
                    dc!,
                    allyModifier
                )
                const message = generateAttemptSkillSentence(
                    skill.name,
                    skillAttemptResult
                )

                this.lastAttemptSkillResult = skillAttemptResult.success
                    ? 'SUCCESS'
                    : 'FAIL'
                this.attemptSkillCount[this.lastAttemptSkillResult] += 1
                this.turnLog.push(message)

                break
            }
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
            case 'end_skill_scene': {
                this.endSkillScene()

                break
            }
            case 'end_skill_turn': {
                this.skillSceneTurn += 1
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
            case 'get_action_order': {
                const initiativeStringified = this.stringifyWithMarker(
                    this.charactersOrdered,
                    this.currentCharacterIndex
                )

                return initiativeStringified
            }
            case 'get_action_skills_count': {
                const result = this.availableSceneSkills.find(
                    sceneSkill => sceneSkill.turn === this.skillSceneTurn
                )?.skills.length

                return result
            }
            case 'get_action_result': {
                const lastLogIndex = this.turnLog.length - 1
                const lastLog = this.turnLog[lastLogIndex]

                return lastLog
            }
            case 'get_attempt_skill_count': {
                const [skillResult] = args as [string]

                return this.attemptSkillCount[
                    skillResult as keyof typeof this.attemptSkillCount
                ]
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
                        return this.adjustNameLength(value, 37)
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
            case 'get_scene_skill_info': {
                const [index, prop] = args as [number, string]
                const skill = this.availableSceneSkills.find(
                    ({ turn }) => turn === this.skillSceneTurn
                )?.skills[index]

                if (skill && prop in skill) {
                    const value = skill[prop as keyof Skill]

                    return value
                }

                throw new Error(
                    `get_scene_skill_info error! check: ${index} - ${prop}`
                )
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
            case 'last_attempt_skill_result': {
                return this.lastAttemptSkillResult
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
            case 'set_skill_scene': {
                const [skillSceneId] = args as [string]
                this.skillSceneId = skillSceneId
                this.skillSceneTurn = 1
                const { skillSceneProgression, reward } = getSkillScene(
                    skillSceneId,
                    this.currentHeroParty[0]
                )
                this.availableSceneSkills = skillSceneProgression
                this.skillSceneReward = reward
                this.skillSceneModifier = getSkillSceneModifier(
                    this.currentHeroParty.filter(hero => !hero.isPlayer)
                )
                this.currentCharacterIndex = 0
                this.charactersOrdered.push(
                    this.currentHeroParty.find(hero => hero.isPlayer)!
                )

                break
            }
            default: {
                throw new Error(`Unhandled function: ${funcName}`)
            }
        }
    }
}

export default GameStore
