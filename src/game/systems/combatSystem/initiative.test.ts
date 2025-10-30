import { describe, it, expect, vi } from 'vitest'
import initiative from './initiative'

import type { Enemy } from 'game/types'

vi.mock('game/systems/rollSystem/roll', async () => {
    const actual = await vi.importActual<
        typeof import('game/systems/rollSystem/roll')
    >('game/systems/rollSystem/roll')

    return {
        ...actual,
        default: vi.fn()
    }
})

const roll = (await import('game/systems/rollSystem/roll'))
    .default as ReturnType<typeof vi.fn>
const _characters: Enemy[] = [
    {
        abilities: {
            str: {
                score: 10,
                modifier: 0
            },
            con: {
                score: 10,
                modifier: 0
            },
            dex: {
                score: 15,
                modifier: 2
            },
            wis: {
                score: 12,
                modifier: 1
            },
            int: {
                score: 10,
                modifier: 0
            },
            cha: {
                score: 9,
                modifier: -1
            }
        },
        actions: ['ATTACK'],
        armorClass: 12,
        hp: 17,
        id: 'blazefen_0001',
        isAlive: true,
        weapon: {
            id: 'shortbow-001',
            name: 'Shortbow',
            range: 'ranged',
            dice: { count: 1, sides: 6, modifier: 3 }
        },
        name: 'Emberpol',
        species: 'blazefen',
        size: 'medium',
        team: 'enemies',
        type: ['elemental', 'humanoid'],
        xp: 50,
        preferredTargets: ['beast']
    },
    {
        abilities: {
            str: {
                score: 10,
                modifier: 0
            },
            con: {
                score: 10,
                modifier: 0
            },
            dex: {
                score: 15,
                modifier: 4
            },
            wis: {
                score: 12,
                modifier: 1
            },
            int: {
                score: 10,
                modifier: 0
            },
            cha: {
                score: 9,
                modifier: -1
            }
        },
        actions: ['ATTACK'],
        armorClass: 12,
        hp: 16,
        id: 'blazefen_0002',
        isAlive: true,
        weapon: {
            id: 'shortbow-001',
            name: 'Shortbow',
            range: 'ranged',
            dice: { count: 1, sides: 6, modifier: 3 }
        },
        name: 'Glowell',
        species: 'blazefen',
        size: 'medium',
        team: 'enemies',
        type: ['elemental', 'humanoid'],
        xp: 50,
        preferredTargets: ['beast']
    },
    {
        abilities: {
            str: {
                score: 10,
                modifier: 0
            },
            con: {
                score: 10,
                modifier: 0
            },
            dex: {
                score: 15,
                modifier: 2
            },
            wis: {
                score: 12,
                modifier: 1
            },
            int: {
                score: 10,
                modifier: 0
            },
            cha: {
                score: 9,
                modifier: -1
            }
        },
        actions: ['ATTACK'],
        armorClass: 12,
        hp: 23,
        id: 'blazefen_0003',
        isAlive: true,
        weapon: {
            id: 'shortbow-001',
            name: 'Shortbow',
            range: 'ranged',
            dice: { count: 1, sides: 6, modifier: 3 }
        },
        name: 'Issmirk',
        species: 'blazefen',
        size: 'medium',
        team: 'enemies',
        type: ['elemental', 'humanoid'],
        xp: 50,
        preferredTargets: ['beast']
    },
    {
        abilities: {
            str: {
                score: 10,
                modifier: 0
            },
            con: {
                score: 10,
                modifier: 0
            },
            dex: {
                score: 15,
                modifier: 1
            },
            wis: {
                score: 12,
                modifier: 1
            },
            int: {
                score: 10,
                modifier: 0
            },
            cha: {
                score: 9,
                modifier: -1
            }
        },
        actions: ['ATTACK'],
        armorClass: 12,
        hp: 23,
        id: 'blazefen_0004',
        isAlive: true,
        weapon: {
            id: 'shortbow-001',
            name: 'Shortbow',
            range: 'ranged',
            dice: { count: 1, sides: 6, modifier: 3 }
        },
        name: 'Issmirk',
        species: 'blazefen',
        size: 'medium',
        team: 'enemies',
        type: ['elemental', 'humanoid'],
        xp: 50,
        preferredTargets: ['beast']
    }
]

describe('initiative', () => {
    it('sorts characters by initiative (descending)', () => {
        const characters = [_characters[0], _characters[1], _characters[2]]
        const expectedInitiative = [
            { id: 'blazefen_0003', initiative: 20, dexModifier: 2 },
            { id: 'blazefen_0001', initiative: 17, dexModifier: 2 },
            { id: 'blazefen_0002', initiative: 14, dexModifier: 4 }
        ]
        roll.mockReturnValueOnce(15)
            .mockReturnValueOnce(10)
            .mockReturnValueOnce(18)

        const result = initiative(characters)

        expect(result).toEqual(expectedInitiative)
    })
    it('breaks ties with dex modifier (descending)', () => {
        const characters = [_characters[3], _characters[1], _characters[2]]
        const expectedInitiative = [
            { id: 'blazefen_0003', initiative: 17, dexModifier: 2 },
            { id: 'blazefen_0004', initiative: 16, dexModifier: 1 },
            { id: 'blazefen_0002', initiative: 12, dexModifier: 4 }
        ]

        roll.mockReturnValueOnce(15)
            .mockReturnValueOnce(8)
            .mockReturnValueOnce(15)

        const result = initiative(characters)

        expect(result).toEqual(expectedInitiative)
    })
})
