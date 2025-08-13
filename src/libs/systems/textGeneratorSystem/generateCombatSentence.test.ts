import { describe, expect, it, vi, afterEach } from 'vitest'
import generateCombatSentence from './generateCombatSentence'
import * as rollSystem from 'libs/systems/rollSystem'

import type { Hero, Enemy } from 'libs/entities'

const hero: Hero = {
    id: 'hero-001',
    name: 'hero-test',
    species: 'human',
    level: 1,
    abilities: {
        str: { score: 10, modifier: 0 },
        dex: { score: 16, modifier: 4 },
        con: { score: 14, modifier: 2 },
        int: { score: 12, modifier: 1 },
        wis: { score: 13, modifier: 1 },
        cha: { score: 8, modifier: -1 }
    },
    armorClass: 14,
    hp: 14,
    isAlive: true,
    weapon: {
        id: 'shortbow-001',
        name: 'Shortbow',
        range: 'ranged',
        dice: { count: 1, sides: 6, modifier: 3 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid']
}
const enemy: Enemy = {
    id: 'enemy-001',
    name: 'enemy-test',
    species: 'human',
    abilities: {
        str: { score: 10, modifier: 0 },
        dex: { score: 16, modifier: 3 },
        con: { score: 14, modifier: 2 },
        int: { score: 12, modifier: 1 },
        wis: { score: 13, modifier: 1 },
        cha: { score: 8, modifier: -1 }
    },
    armorClass: 14,
    hp: 14,
    isAlive: true,
    weapon: {
        id: 'shortbow-001',
        name: 'Shortbow',
        range: 'ranged',
        dice: { count: 1, sides: 6, modifier: 3 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'enemies',
    type: ['humanoid'],
    xp: 0
}

describe('generateCombatSentence', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Critical hits', () => {
        const attackResult = { success: true, critical: true }

        it('returns correct message for roll=1', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('hero-test critically smashes enemy-test!')
        })
        it('returns correct message for roll=2', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(2)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('Devastating hit! enemy-test reels.')
        })
        it('returns correct message for roll=3', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(3)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('hero-test brutalizes enemy-test!')
        })
        it('returns correct message for roll=4', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(4)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('hero-test annihilates enemy-test!')
        })
    })

    describe('Normal hits', () => {
        const attackResult = { success: true, critical: false }

        it('returns correct message for roll=1', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('hero-test hits enemy-test.')
        })
        it('returns correct message for roll=2', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(2)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('hero-test strikes the human.')
        })
        it('returns correct message for roll=3', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(3)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('enemy-test takes damage.')
        })
        it('returns correct message for roll=4', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(4)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('Solid strike.')
        })
    })

    describe('Misses', () => {
        const attackResult = { success: false, critical: false }

        it('returns correct message for roll=1', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('hero-test misses.')
        })
        it('returns correct message for roll=2', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(2)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('enemy-test dodges!')
        })
        it('returns correct message for roll=3', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(3)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('enemy-test evades.')
        })
        it('returns correct message for roll=4', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(4)

            const result = generateCombatSentence(hero, enemy, attackResult)

            expect(result).toBe('Attack fails.')
        })
    })

    describe('Attacker reversal (enemy attacking hero)', () => {
        it('returns correct critical message', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

            const result = generateCombatSentence(enemy, hero, {
                success: true,
                critical: true
            })

            expect(result).toBe('enemy-test critically smashes hero-test!')
        })
        it('returns correct normal success message', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

            const result = generateCombatSentence(enemy, hero, {
                success: true,
                critical: false
            })

            expect(result).toBe('enemy-test hits hero-test.')
        })
        it('returns correct miss message', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

            const result = generateCombatSentence(enemy, hero, {
                success: false,
                critical: false
            })

            expect(result).toBe('enemy-test misses.')
        })
    })
})
