import type { Hero } from 'game/types'

const protaxios: Hero = {
    id: 'hero_0003',
    name: 'Protaxios',
    species: 'human',
    level: 2,
    abilities: {
        str: { score: 12, modifier: 1 },
        dex: { score: 17, modifier: 3 },
        con: { score: 13, modifier: 1 },
        int: { score: 11, modifier: 0 },
        wis: { score: 10, modifier: 0 },
        cha: { score: 9, modifier: -1 }
    },
    armorClass: 15,
    hp: 16,
    isAlive: true,
    weapon: {
        id: 'shortbow_0001',
        name: 'Shortbow',
        range: 'ranged',
        dice: { count: 1, sides: 6, modifier: 0 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid']
}

export default protaxios
