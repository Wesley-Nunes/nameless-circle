import type { Hero } from 'game/types'

export const HERO_TEST_ID = 'hero_9999'
export const HERO_TEST: Hero = {
    id: HERO_TEST_ID,
    name: 'hero test',
    species: 'human',
    level: 1,
    abilities: {
        str: { score: 16, modifier: 3 },
        dex: { score: 14, modifier: 2 },
        con: { score: 16, modifier: 3 },
        int: { score: 8, modifier: -1 },
        wis: { score: 10, modifier: 0 },
        cha: { score: 12, modifier: 1 }
    },
    armorClass: 18,
    hp: 13,
    isAlive: true,
    weapon: {
        id: 'longsword_0001',
        name: 'Longsword',
        range: 'melee',
        dice: { count: 1, sides: 8, modifier: 3 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid']
}
