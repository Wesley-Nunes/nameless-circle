import { describe, it, expect } from 'vitest'

import getNextCharacterIndex from './getNextCharacterIndex'

import { HERO_TEST } from 'libs/data/static/heroes/HERO_TEST'

import type { Hero, Enemy } from 'libs/entities'

const createTestHero = (id: string, hp: number): Hero => ({
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

describe('getNextCharacterIndex', () => {
    it('returns next index when next character is alive', () => {
        const characters = [
            createTestHero('hero1', 100),
            createTestHero('hero2', 100),
            createTestEnemy('enemy1', 100)
        ]
        const currentIndex = 0

        const result = getNextCharacterIndex(characters, currentIndex)

        expect(result).toBe(1)
    })
    it('skips dead characters and returns next alive index', () => {
        const characters = [
            createTestHero('hero1', 100),
            createTestEnemy('enemy1', 0),
            createTestHero('hero2', 100)
        ]
        const currentIndex = 0

        const result = getNextCharacterIndex(characters, currentIndex)

        expect(result).toBe(2)
    })
    it('wraps around to start when at end of array', () => {
        const characters = [
            createTestHero('hero1', 100),
            createTestHero('hero2', 100),
            createTestEnemy('enemy1', 100)
        ]
        const currentIndex = 2

        const result = getNextCharacterIndex(characters, currentIndex)

        expect(result).toBe(0)
    })
    it('should throw an error when all characters are dead', () => {
        const characters = [
            createTestHero('hero1', 0),
            createTestEnemy('enemy1', 0),
            createTestHero('hero2', 0)
        ]
        const currentIndex = 0

        expect(() => getNextCharacterIndex(characters, currentIndex))
            .toThrowError(
                'All characters are dead.' +
                'Call getStatusCombat() to check combat status before invoking this function.'
            )
    })
    it('handles consecutive dead characters correctly', () => {
        const characters = [
            createTestHero('hero1', 100),
            createTestEnemy('enemy1', 0),
            createTestEnemy('enemy2', 0),
            createTestHero('hero2', 100)
        ]
        const currentIndex = 0

        const result = getNextCharacterIndex(characters, currentIndex)

        expect(result).toBe(3)
    })

    it('returns same position when only one character remains alive', () => {
        const characters = [
            createTestEnemy('enemy1', 0),
            createTestHero('hero1', 100),
            createTestEnemy('enemy2', 0)
        ]
        const currentIndex = 1

        const result = getNextCharacterIndex(characters, currentIndex)

        expect(result).toBe(1)
    })
})

