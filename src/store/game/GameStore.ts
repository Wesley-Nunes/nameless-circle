import { getCombat } from 'libs/data/accessors'
import { initiative } from 'libs/systems/combatSystem'

import type { Character, Enemy, Hero } from 'libs/entities'

class GameStore {
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
                con: { score: 12, modifier: 1 },
                int: { score: 14, modifier: 2 },
                wis: { score: 13, modifier: 1 },
                cha: { score: 8, modifier: -1 }
            },
            armorClass: 14,
            hp: 9,
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
            type: ['humanoid']
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
    private initiative: { id: string, initiative: number }[] = []

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
    private stringifyWithMarker(characters: Character[], i: number): string {
        return characters.map((item, index) => (
            index === i ? `[x] ${item.name}` : item.name
        )).join(' / ')
    }

    public handleInkFunction(funcName: string, ...args: string[]) {
        switch (funcName) {
            case 'get_character_info': {
                const [teamName, index, prop] = args
                const team = this.getTeam(teamName)
                const char = this.getChar(team, +index)
                const value = this.getCharPropertyValue(char, prop)

                return value
            }
            case 'get_initiative': {
                this.initiative = initiative([...this.heroes, ...this.enemies])

                const charactersOrdered = this.initiative.map((char) => {
                    const hero = this.heroes.find(hero => hero.id === char.id)
                    const enemy = this.enemies.find(enemy => enemy.id === char.id)

                    if (hero) return hero
                    if (enemy) return enemy

                    throw new Error('Fail to order the characters')
                })
                const initiativeStringified = this.stringifyWithMarker(charactersOrdered, 0)

                return initiativeStringified
            }
            case 'get_party_size': {
                const [teamName] = args
                const team = this.getTeam(teamName)

                return team.length
            }
            case 'set_combat': {
                const [combatId] = args
                const combat = getCombat(combatId, this.heroes)

                this.enemies = combat.enemies

                break
            }
            default: {
                throw new Error(`Unhandled function: ${funcName}`)
            }
        }
    }
}

export default GameStore

