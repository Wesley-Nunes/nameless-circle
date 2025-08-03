import { getCombat } from 'libs/data/accessors'
import { initiative } from 'libs/systems/combatSystem'

import type { Character, Enemy, Hero } from 'libs/entities'

class GameStore {
    private charactersOrdered: (Hero | Enemy)[] = []
    private currentCharacterIndex: number = 0
    private enemies: Enemy[] = []
    private heroes: Hero[] = [
        {
            id: 'hero-001',
            name: 'Celcius', // NOTE: This is the player!
            species: 'human',
            level: 1,
            abilities: {
                str: { score: 10, modifier: 0 },
                dex: { score: 16, modifier: 3 },
                con: { score: 14, modifier: 2 },
                int: { score: 12, modifier: 1 },
                wis: { score: 13, modifier: 1 },
                cha: { score: 8, modifier: -1 }
            },
            armorClass: 14,
            hp: 14,
            isAlive: true,
            items: [{
                id: 'shortbow-001',
                name: 'Shortbow',
                range: 'ranged',
                dice: { count: 1, sides: 6, modifier: 3 }
            }],
            actions: ['ATTACK'],
            size: 'medium',
            team: 'heroes',
            type: ['humanoid'],
            isPlayer: true
        },
        {
            id: 'hero-002',
            name: 'Lysandra',
            species: 'human',
            level: 3,
            abilities: {
                str: { score: 16, modifier: 3 },
                dex: { score: 14, modifier: 2 },
                con: { score: 15, modifier: 2 },
                int: { score: 10, modifier: 0 },
                wis: { score: 12, modifier: 1 },
                cha: { score: 13, modifier: 1 }
            },
            armorClass: 16,
            hp: 28,
            isAlive: true,
            items: [{
                id: 'longsword-001',
                name: 'Longsword',
                range: 'melee',
                dice: { count: 1, sides: 8, modifier: 3 }
            }],
            actions: ['ATTACK'],
            size: 'medium',
            team: 'heroes',
            type: ['humanoid']
        }
    ]

    private getTeam(teamName: string) {
        if (this.isTeam(teamName)) {
            return this[teamName]
        }

        throw new Error(`Team: $${teamName} not found.`)
    }
    private getChar(team: (Hero[] | Enemy[]), index: number): (Hero | Enemy) {
        const char = team[index]

        if (!char) {
            throw new Error(`Failed to get character at index ${index} / team ${team}.`)
        }

        return team[index]
    }
    private getCharPropertyValue(char: (Hero | Enemy), prop: string) {
        if (prop in char) {
            return char[prop as keyof typeof char]
        }

        throw new Error(`getCharPropertyValue failed for property '${prop}'.`)
    }
    private isTeam(key: string): key is 'heroes' | 'enemies' {
        return ['heroes', 'enemies'].includes(key)
    }
    private runInitiative() {
        this.charactersOrdered = initiative([...this.heroes, ...this.enemies])
            .map((char) => {
                const hero = this.heroes.find(hero => hero.id === char.id)
                const enemy = this.enemies.find(enemy => enemy.id === char.id)

                if (hero) return hero
                if (enemy) return enemy

                throw new Error('Fail to order the characters')
            })
    }
    private stringifyWithMarker(characters: (Hero | Enemy)[], i: number): string {
        return characters.map((item, index) => (
            index === i ? `[x] ${item.name}` : item.name
        )).join(' / ')
    }

    public handleInkFunction(funcName: string, ...args: string[]) {
        switch (funcName) {
            case 'get_action_order': {
                const initiativeStringified = this.stringifyWithMarker(
                    this.charactersOrdered, this.currentCharacterIndex
                )

                return initiativeStringified
            }
            case 'get_character_info': {
                const [teamName, index, prop] = args
                const team = this.getTeam(teamName)
                const char = this.getChar(team, +index)
                const value = this.getCharPropertyValue(char, prop)

                return value
            }
            case 'get_party_size': {
                const [teamName] = args
                const team = this.getTeam(teamName)

                return team.length
            }
            case 'is_player_action': {
                const playerId = this.heroes.find(hero => hero.isPlayer)!.id
                const isPlayerTurn = (
                    this.charactersOrdered[this.currentCharacterIndex].id === playerId
                )

                return isPlayerTurn
            }
            case 'set_combat': {
                const [combatId] = args
                const combat = getCombat(combatId, this.heroes)

                this.enemies = combat.enemies
                this.runInitiative()

                break
            }
            default: {
                throw new Error(`Unhandled function: ${funcName}`)
            }
        }
    }
}

export default GameStore

