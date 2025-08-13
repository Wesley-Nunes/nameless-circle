import { describe, it, expect } from 'vitest'

import generateCombatResultPoints from './generateCombatResultPoints'

import {
    type Combatant,
    type CombatStatus,
    type WinCondition
} from 'libs/entities'

describe('generateCombatResultPoints', () => {
    const mockCombatants: Combatant[] = [
        {
            id: 'hero_0001',
            name: 'Celcius',
            species: 'human',
            level: 1,
            abilities: {
                str: { score: 10, modifier: 0 },
                dex: { score: 16, modifier: 9 },
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
        },
        {
            abilities: {
                str: { score: 8, modifier: -1 },
                con: { score: 9, modifier: -1 },
                dex: { score: 13, modifier: 1 },
                wis: { score: 10, modifier: 0 },
                int: { score: 8, modifier: -1 },
                cha: { score: 8, modifier: -1 }
            },
            actions: ['ATTACK'],
            armorClass: 11,
            hp: -997,
            id: 'blazefen_0001',
            isAlive: false,
            weapon: {
                id: 'shortbow_0001',
                name: 'Shortbow',
                range: 'ranged',
                dice: { count: 1, sides: 6, modifier: 0 }
            },
            name: 'Zizzwell',
            species: 'blazefen',
            size: 'medium',
            team: 'enemies',
            type: ['elemental', 'humanoid'],
            xp: 50,
            preferredTargets: ['beast']
        }
    ]
    const mockWinCondition: WinCondition = [
        { quantity: 1, team: 'heroes', isAlive: true },
        { quantity: 1, team: 'enemies', isAlive: false }
    ]

    it('returns -1 for DEFEAT status', () => {
        const status: CombatStatus = 'DEFEAT'

        const result = generateCombatResultPoints(
            mockCombatants,
            status,
            mockWinCondition
        )

        expect(result).toBe(-1)
    })
    it('returns accumulated points for VICTORY when all conditions are met', () => {
        const status: CombatStatus = 'VICTORY'
        const winCondition: WinCondition = [
            { quantity: 1, team: 'heroes', isAlive: true },
            { quantity: 1, team: 'enemies', isAlive: false }
        ]

        const result = generateCombatResultPoints(
            mockCombatants,
            status,
            winCondition
        )

        expect(result).toBe(2)
    })
    it('stops accumulating and returns current points when a condition fails', () => {
        const status: CombatStatus = 'VICTORY'
        const winCondition: WinCondition = [
            { quantity: 1, team: 'heroes', isAlive: true },
            { quantity: 999, team: 'enemies', isAlive: false } // Impossible condition
        ]

        const result = generateCombatResultPoints(
            mockCombatants,
            status,
            winCondition
        )

        expect(result).toBe(1)
    })
    it('returns 0 points for VICTORY with empty win conditions', () => {
        const status: CombatStatus = 'VICTORY'
        const winCondition: WinCondition = []

        const result = generateCombatResultPoints(
            mockCombatants,
            status,
            winCondition
        )

        expect(result).toBe(0)
    })
    it('throws error for unhandled combat status', () => {
        const status = 'UNKNOWN' as CombatStatus

        expect(() =>
            generateCombatResultPoints(mockCombatants, status, mockWinCondition)
        ).toThrowError('Unhandled combat status: UNKNOWN')
    })
    it('handles complex conditions with multiple properties', () => {
        const status: CombatStatus = 'VICTORY'
        const winCondition: WinCondition = [
            {
                quantity: 1,
                team: 'heroes',
                isAlive: true,
                species: 'human'
            }
        ]

        const result = generateCombatResultPoints(
            mockCombatants,
            status,
            winCondition
        )

        expect(result).toBe(1)
    })
})
