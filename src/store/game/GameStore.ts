import { attack, initiative, getCombatStatus, getNextCharacterIndex } from 'libs/systems/combatSystem'
import { calculateDamage } from 'libs/systems/damageSystem'
import { findTarget } from 'libs/systems/aiSystem'
import { generateCombatSentence } from 'libs/systems/textGeneratorSystem'
import { newParty } from 'libs/systems/playerSystem'

import { getCombat, getHeroById } from 'libs/data/accessors'

import { PLAYER_ID } from 'libs/data/static/heroes'

import type { CombatStatus, Enemy, Hero } from 'libs/entities'

class GameStore {
    private availableHeroIds: string[]
    private charactersOrdered: (Hero | Enemy)[]
    private combatStatus: CombatStatus
    private currentCharacterIndex: number
    private currentHeroParty: Hero[]
    private log: string[]

    constructor() {
        this.availableHeroIds = [PLAYER_ID, 'hero_0002']
        this.charactersOrdered = []
        this.combatStatus = getCombatStatus()
        this.currentCharacterIndex = 0
        this.currentHeroParty = [getHeroById(PLAYER_ID)]
        this.log = []
    }

    // NOTE: It should be moved to a proper system after create more action
    private attackAction(attacker: (Hero | Enemy), target: (Hero | Enemy)) {
        const attackResult = attack(attacker, target)

        if (attackResult.hit) {
            const damage = calculateDamage(attacker, attackResult.critical)
            // NOTE: HP is currently decreased directly from the Character object 
            // for simplicity. This will be handled by a dedicated HP system later.
            target.hp -= damage
        }
        const combatMessage = generateCombatSentence(attacker, target, attackResult)

        this.log.push(combatMessage)
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
    private stringifyWithMarker(characters: (Hero | Enemy)[], i: number): string {
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

    public handleInkFunction(funcName: string, ...args: ([] | [string] | [string, number, string])) {
        switch (funcName) {
            case 'add_to_hero_party': {
                const [heroId] = args as [string]

                this.currentHeroParty = newParty(
                    this.currentHeroParty, this.availableHeroIds, heroId
                )

                break
            }
            case 'ai_action': {
                const attacker = this.charactersOrdered[this.currentCharacterIndex]
                const target = findTarget(attacker, this.charactersOrdered)

                this.attackAction(attacker, target)

                break
            }
            case 'attack': {
                const attacker = this.charactersOrdered[this.currentCharacterIndex]
                const [targetId] = args
                const target = this.charactersOrdered.find(character => character.id === targetId)

                if (!target) {
                    throw new Error(`Unable to find target: ${JSON.stringify(target)}.`)
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
                const lastLogIndex = this.log.length - 1
                const lastLog = this.log[lastLogIndex]

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

                throw new Error(`get_character_info error! check: ${teamName} - ${index} - ${prop}`)
            }
            case 'get_combat_status': {
                return this.combatStatus
            }
            case 'get_party_size': {
                const [teamName] = args
                const team = this.charactersOrdered.filter(
                    character => character.team === teamName
                )

                return team.length
            }
            case 'is_player_action': {
                const isPlayerTurn = (
                    this.charactersOrdered[this.currentCharacterIndex].id === PLAYER_ID
                )

                return isPlayerTurn
            }
            case 'set_combat': {
                const [combatId] = args
                const combat = getCombat(combatId!, this.currentHeroParty)

                this.runInitiative(this.currentHeroParty, combat.enemies)
                this.combatStatus = getCombatStatus(this.charactersOrdered)

                break
            }
            default: {
                throw new Error(`Unhandled function: ${funcName}`)
            }
        }
    }
}

export default GameStore

