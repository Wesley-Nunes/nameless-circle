import { describe, expect, it, vi, afterEach } from 'vitest'
import generateCombatSentence from './generateCombatSentence'
import * as rollSystem from 'libs/systems/rollSystem'

import type { Hero, Enemy, DamageResult } from 'libs/entities'

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
const mockDamageResult: DamageResult = {
    damage: 5,
    oldHp: 14,
    newHp: 9,
    stillAlive: true
}
const mockLethalDamageResult: DamageResult = {
    damage: 14,
    oldHp: 14,
    newHp: 0,
    stillAlive: false
}

describe('generateCombatSentence', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Critical hits', () => {
        const attackResult = { success: true, critical: true }

        it('returns correct message for roll=1', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                'hero-test critically annihilates enemy-test for 5 damage!'
            )
        })
        it('returns correct message for roll=2', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(2)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                "hero-test's devastating blow crushes enemy-test (14 → 9 HP)!"
            )
        })
        it('returns correct message for roll=3', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(3)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                'hero-test brutally smashes enemy-test with a critical hit, dealing 5 damage!'
            )
        })
        it('returns correct message for roll=4', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(4)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                'hero-test lands a catastrophic strike on enemy-test (14 → 9 HP)!'
            )
        })
        it('includes death message when target is defeated', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockLethalDamageResult
            )
            expect(result).toBe(
                'hero-test critically annihilates enemy-test for 14 damage! enemy-test has been defeated!'
            )
        })
    })

    describe('Normal hits', () => {
        const attackResult = { success: true, critical: false }

        it('returns correct message for roll=1', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe('hero-test strikes enemy-test for 5 damage.')
        })
        it('returns correct message for roll=2', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(2)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                "hero-test's attack hits enemy-test (14 → 9 HP)."
            )
        })
        it('returns correct message for roll=3', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(3)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                'hero-test wounds enemy-test with a solid strike, dealing 5 damage.'
            )
        })
        it('returns correct message for roll=4', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(4)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockDamageResult
            )
            expect(result).toBe(
                'hero-test damages enemy-test in combat (14 → 9 HP).'
            )
        })
        it('includes death message when target is defeated', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(
                hero,
                enemy,
                attackResult,
                mockLethalDamageResult
            )
            expect(result).toBe(
                'hero-test strikes enemy-test for 14 damage. enemy-test has been defeated!'
            )
        })
    })

    describe('Misses', () => {
        const attackResult = { success: false, critical: false }

        it('returns correct message for roll=1', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(hero, enemy, attackResult)
            expect(result).toBe("hero-test's attack misses enemy-test.")
        })
        it('returns correct message for roll=2', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(2)
            const result = generateCombatSentence(hero, enemy, attackResult)
            expect(result).toBe("enemy-test nimbly dodges hero-test's assault.")
        })
        it('returns correct message for roll=3', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(3)
            const result = generateCombatSentence(hero, enemy, attackResult)
            expect(result).toBe('hero-test fails to hit the agile enemy-test.')
        })
        it('returns correct message for roll=4', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(4)
            const result = generateCombatSentence(hero, enemy, attackResult)
            expect(result).toBe(
                "enemy-test evades hero-test's attack completely."
            )
        })
    })

    describe('Attacker reversal (enemy attacking hero)', () => {
        it('returns correct critical message', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(
                enemy,
                hero,
                {
                    success: true,
                    critical: true
                },
                mockDamageResult
            )
            expect(result).toBe(
                'enemy-test critically annihilates hero-test for 5 damage!'
            )
        })
        it('returns correct normal success message', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(
                enemy,
                hero,
                {
                    success: true,
                    critical: false
                },
                mockDamageResult
            )
            expect(result).toBe('enemy-test strikes hero-test for 5 damage.')
        })
        it('returns correct miss message', () => {
            vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
            const result = generateCombatSentence(enemy, hero, {
                success: false,
                critical: false
            })
            expect(result).toBe("enemy-test's attack misses hero-test.")
        })
    })
})
