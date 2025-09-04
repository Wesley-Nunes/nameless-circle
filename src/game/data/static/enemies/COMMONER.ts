import type { Enemy } from 'game/entities'

const COMMONER_BASE: Enemy = {
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
    id: 'commoner_',
    isAlive: false,
    weapon: {
        id: 'club_0001',
        name: 'Club',
        range: 'melee',
        dice: { count: 1, sides: 4, modifier: 0 }
    },
    name: 'commoner',
    species: 'human',
    size: 'medium',
    team: 'enemies',
    type: ['humanoid'],
    xp: 0
}

export default COMMONER_BASE
