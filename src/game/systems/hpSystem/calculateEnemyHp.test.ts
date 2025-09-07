import { describe, expect, it } from 'vitest'

import calculateEnemyHp from './calculateEnemyHp'

describe('calculateEnemyHp', () => {
    it('calculates HP correctly for medium XP100', () => {
        const expectedHp = {
            hp: 18,
            maxHp: 32,
            formula: '4d8',
            numDice: 4,
            dieFace: 8,
            conBonus: 0
        }

        const result = calculateEnemyHp(100, 'medium')

        expect(result).toMatchObject(expectedHp)
        expect(result.randomHp).toBeGreaterThanOrEqual(expectedHp.hp)
        expect(result.randomHp).toBeLessThanOrEqual(expectedHp.maxHp)
    })

    it('applies positive CON modifier correctly', () => {
        const expectedFormula = '6d6 + 18'
        const expectedHp = 6 * 3.5 + 18

        const result = calculateEnemyHp(200, 'small', 3)

        expect(result.formula).toBe(expectedFormula)
        expect(result.hp).toBe(expectedHp)
    })

    it('applies negative CON modifier correctly', () => {
        const expectedFormula = '3d10 - 6'
        const expectedHp = Math.floor(3 * 5.5 - 6)

        const result = calculateEnemyHp(50, 'large', -2)

        expect(result.formula).toBe(expectedFormula)
        expect(result.hp).toBe(expectedHp)
    })

    it('ensures minimum HP of 1', () => {
        const expectedHp = 1

        const result = calculateEnemyHp(10, 'tiny', -10)

        expect(result.hp).toBe(expectedHp)
        expect(result.maxHp).toBe(expectedHp)
        expect(result.randomHp).toBe(expectedHp)
    })
})
