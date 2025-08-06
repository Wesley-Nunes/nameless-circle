import type { Hero } from 'libs/entities'

const lysandra: Hero = {
    id: 'hero_0002',
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
    weapon: {
        id: 'longsword_0001',
        name: 'Longsword',
        range: 'melee',
        dice: { count: 1, sides: 8, modifier: 0 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid']
}

export default lysandra

