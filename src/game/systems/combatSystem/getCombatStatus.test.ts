import { describe, it, expect } from 'vitest'

import getCombatStatus from './getCombatStatus'

import type { Hero, Enemy } from 'game/types'

describe('getCombatStatus', () => {
    it('returns UNINITIALIZED when characters is undefined', () => {
        expect(getCombatStatus()).toBe('UNINITIALIZED')
    })
    it('returns VICTORY when all enemies are defeated', () => {
        const heroes: Hero[] = [
            { id: 'hero_0001', team: 'heroes', hp: 10 } as Hero
        ]
        const enemies: Enemy[] = [
            { id: 'enemy_0001', team: 'enemies', hp: 0 } as Enemy,
            { id: 'enemy_0002', team: 'enemies', hp: -5 } as Enemy
        ]
        const expectedCombatStatus = 'VICTORY'

        const combatStatus = getCombatStatus([...heroes, ...enemies])

        expect(combatStatus).toBe(expectedCombatStatus)
    })
    it('returns DEFEAT when all heroes are defeated', () => {
        const heroes: Hero[] = [
            { id: 'hero_0001', team: 'heroes', hp: 0 } as Hero,
            { id: 'hero_0002', team: 'heroes', hp: -5 } as Hero
        ]
        const enemies: Enemy[] = [
            { id: 'enemy_0001', team: 'enemies', hp: 10 } as Enemy
        ]
        const expectedCombatStatus = 'DEFEAT'

        const combatStatus = getCombatStatus([...heroes, ...enemies])

        expect(combatStatus).toBe(expectedCombatStatus)
    })
    it('returns IN_PROGRESS when both teams have living members', () => {
        const heroes: Hero[] = [
            { id: 'hero_0001', team: 'heroes', hp: 10 } as Hero,
            { id: 'hero_0002', team: 'heroes', hp: -5 } as Hero
        ]
        const enemies: Enemy[] = [
            { id: 'enemy_0001', team: 'enemies', hp: 10 } as Enemy
        ]
        const expectedCombatStatus = 'IN_PROGRESS'

        const combatStatus = getCombatStatus([...heroes, ...enemies])

        expect(combatStatus).toBe(expectedCombatStatus)
    })
})
