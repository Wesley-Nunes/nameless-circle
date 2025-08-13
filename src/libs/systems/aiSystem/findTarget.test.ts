import { describe, expect, it } from 'vitest'

import findTarget from './findTarget'

import { HERO_TEST } from 'libs/data/static/heroes/HERO_TEST'

import type { Hero, Enemy } from 'libs/entities'

const createTestHero = (id: string, hp: number): Hero => ({
    ...HERO_TEST,
    id,
    hp,
    isAlive: hp > 0
})

const createTestEnemy = (id: string, hp: number): Enemy => ({
    ...HERO_TEST,
    id,
    hp,
    isAlive: hp > 0,
    team: 'enemies',
    xp: 10
})

describe('findTarget', () => {
    it('should target weakest enemy', () => {
        const heroAI = createTestHero('hero-1', 100)
        const party = [
            createTestHero('hero-2', 100),
            createTestEnemy('enemy-1', 50),
            createTestEnemy('enemy-2', 30),
            createTestEnemy('enemy-3', 70)
        ]

        const target = findTarget(heroAI, party)

        expect(target.id).toBe('enemy-2')
    })
    it('should target strongest hero', () => {
        const enemyAI = createTestEnemy('enemy-1', 100)
        const party = [
            createTestHero('hero-1', 80),
            createTestHero('hero-2', 120),
            createTestHero('hero-3', 90),
            createTestEnemy('enemy-2', 50)
        ]

        const target = findTarget(enemyAI, party)

        expect(target.id).toBe('hero-2')
    })
    it('should ignore dead characters', () => {
        const heroAI = createTestHero('hero-1', 100)
        const party = [
            createTestEnemy('enemy-1', 0),
            createTestEnemy('enemy-2', 10),
            createTestEnemy('enemy-3', 0)
        ]

        const target = findTarget(heroAI, party)

        expect(target.id).toBe('enemy-2')
    })
    it('should handle single valid target', () => {
        const enemyAI = createTestEnemy('enemy-1', 100)
        const party = [
            createTestHero('hero-1', 0),
            createTestHero('hero-2', 50),
            createTestHero('hero-3', 0)
        ]

        const target = findTarget(enemyAI, party)

        expect(target.id).toBe('hero-2')
    })
    it('should return first target when equal HP', () => {
        const heroAI = createTestHero('hero-1', 100)
        const party = [
            createTestEnemy('enemy-1', 25),
            createTestEnemy('enemy-2', 25)
        ]

        const target = findTarget(heroAI, party)

        expect(target.id).toBe('enemy-1')
    })
    it('should throw error for invalid team', () => {
        const invalidAI = { ...createTestHero('invalid', 100), team: 'invalid' }
        const party = [createTestHero('hero-1', 100)]

        // @ts-expect-error - Invalid team
        expect(() => findTarget(invalidAI, party)).toThrow('Team not found')
    })
})
