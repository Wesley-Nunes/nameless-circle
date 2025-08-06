import { describe, it, expect } from 'vitest'

import { HERO_TEST } from 'libs/data/static/heroes/HERO_TEST'
import getCombatStatus from './getCombatStatus'

import type { Hero, Enemy } from 'libs/entities'

const createTestHero = (id: string, hp: number,): Hero => ({
    ...HERO_TEST,
    id,
    hp,
    isAlive: hp > 0,
})

const createTestEnemy = (id: string, hp: number): Enemy => ({
    ...HERO_TEST,
    id,
    hp,
    isAlive: hp > 0,
    team: 'enemies',
    xp: 10
})

describe('getCombatStatus', () => {
    it('returns UNINITIALIZED when characters is undefined', () => {
        const characters = undefined

        const result = getCombatStatus(characters)

        expect(result).toBe('UNINITIALIZED')
    })
    it('returns VICTORY when all enemies are defeated', () => {
        const characters = [
            createTestHero('hero1', 10),
            createTestEnemy('enemy1', 0),
            createTestEnemy('enemy2', -5)
        ]

        const result = getCombatStatus(characters)

        expect(result).toBe('VICTORY')
    })
    it('returns VICTORY when no enemies exist', () => {
        const characters = [
            createTestHero('hero1', 10),
            createTestHero('hero2', 5)
        ]

        const result = getCombatStatus(characters)

        expect(result).toBe('VICTORY')
    })
    it('returns DEFEAT when all heroes are defeated', () => {
        const characters = [
            createTestHero('hero1', 0),
            createTestHero('hero2', -2),
            createTestEnemy('enemy1', 10)
        ]

        const result = getCombatStatus(characters)

        expect(result).toBe('DEFEAT')
    })
    it('returns DEFEAT when no heroes exist', () => {
        const characters = [
            createTestEnemy('enemy1', 10),
            createTestEnemy('enemy2', 5)
        ]

        const result = getCombatStatus(characters)

        expect(result).toBe('DEFEAT')
    })
    it('returns IN_PROGRESS when both teams have living members', () => {
        const characters = [
            createTestHero('hero1', 10),
            createTestHero('hero2', 0),
            createTestEnemy('enemy1', 5),
            createTestEnemy('enemy2', -3)
        ]

        const result = getCombatStatus(characters)

        expect(result).toBe('IN_PROGRESS')
    })
    it('returns IN_PROGRESS when at least one hero and one enemy are alive', () => {
        const characters = [
            createTestHero('hero1', 1),
            createTestEnemy('enemy1', 1)
        ]

        const result = getCombatStatus(characters)

        expect(result).toBe('IN_PROGRESS')
    })
})

