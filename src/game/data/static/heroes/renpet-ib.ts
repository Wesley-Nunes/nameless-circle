import type { Hero } from 'game/types'

const renpetIb: Hero = {
    id: 'hero_0004',
    name: 'Renpet-Ib',
    species: 'human',
    level: 2,
    abilities: {
        str: { score: 10, modifier: 0 },
        dex: { score: 12, modifier: 1 },
        con: { score: 14, modifier: 2 },
        int: { score: 11, modifier: 0 },
        wis: { score: 16, modifier: 3 },
        cha: { score: 13, modifier: 1 }
    },
    armorClass: 17,
    hp: 17,
    isAlive: true,
    weapon: {
        id: 'mace_0001',
        name: 'Mace',
        range: 'melee',
        dice: { count: 1, sides: 6, modifier: 0 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid']
}

export default renpetIb
