import { getCombat } from 'libs/data/accessors'

import type { Enemy, Hero } from 'libs/entities'

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
                dice: { count: 1, sides: 8, modifier: 3 }  // +3 from str mod
            }],
            actions: ['ATTACK'],
            size: 'medium',
            team: 'heroes',
            type: ['humanoid']
        }
    ]

    private isEnemyKey(key: string, obj: Enemy): key is keyof Enemy {
        return key in obj
    }
    private isHeroKey(key: string, obj: Hero): key is keyof Hero {
        return key in obj
    }
    private isTeam(key: string): key is 'heroes' | 'enemies' {
        return ['heroes', 'enemies'].includes(key)
    }

    public handleInkFunction(funcName: string, ...args: string[]) {
        switch (funcName) {
            case 'set_combat': {
                const combatId = args[0]
                const combat = getCombat(combatId, this.heroes)
                this.enemies = combat.enemies

                break
            }
            case 'get_character_info': {
                const [team, index, prop] = args

                if (team === 'heroes') {
                    const hero = this.heroes[+index]
                    if (hero && this.isHeroKey(prop, hero)) {
                        return hero[prop]
                    }
                } else if (team === 'enemies') {
                    const enemy = this.enemies[+index]
                    if (enemy && this.isEnemyKey(prop, enemy)) {
                        return enemy[prop]
                    }
                }

                throw new Error(`ERROR! get_character_info Check ${team}/${index}/${prop}`)
            }
            case 'get_party_size': {
                const [team] = args

                if (team && this.isTeam(team)) {
                    return this[team].length
                }

                throw new Error(`ERROR! team ${team} not found`)
            }

        }
    }
}

export default GameStore

