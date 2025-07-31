import type { Enemy } from 'libs/entities'

const BLAZEFEN_BASE: Enemy = {
    abilities: {
        str: { score: 0, modifier: 0 },
        dex: { score: 0, modifier: 0 },
        con: { score: 0, modifier: 0 },
        int: { score: 0, modifier: 0 },
        wis: { score: 0, modifier: 0 },
        cha: { score: 0, modifier: 0 }
    },
    actions: ['ATTACK'],
    armorClass: 0,
    hp: 0,
    id: 'blazefen_',
    isAlive: false,
    items: [],
    name: 'blazefen',
    race: 'blazefen',
    size: 'medium',
    team: 'enemies',
    type: ['elemental', 'humanoid'],
    xp: 0
}

export default BLAZEFEN_BASE

