import type { Hero } from 'game/entities'

export const PLAYER_ID = 'hero_0001'

export const player: Hero = {
    id: PLAYER_ID,
    name: '',
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
    hp: 15,
    isAlive: true,
    weapon: {
        id: 'hand_crossbow_0001',
        name: 'Hand Crossbow',
        range: 'ranged',
        dice: { count: 1, sides: 6, modifier: 0 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid'],
    isPlayer: true
}
