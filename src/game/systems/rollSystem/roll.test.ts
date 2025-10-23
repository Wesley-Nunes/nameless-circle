import { describe, it, expect } from 'vitest'
import roll from './roll'

describe('roll', () => {
    it('It should roll a d4 die (1-4)', () => {
        const minRollValue = 1
        const maxRollValue = 4

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('It should roll a d6 die (1-6)', () => {
        const minRollValue = 1
        const maxRollValue = 6

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('It should roll a d8 die (1-8)', () => {
        const minRollValue = 1
        const maxRollValue = 8

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('It should roll a d10 die (1-10)', () => {
        const minRollValue = 1
        const maxRollValue = 10

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('It should roll a d12 die (1-12)', () => {
        const minRollValue = 1
        const maxRollValue = 12

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('It should roll a d20 die (1-20)', () => {
        const minRollValue = 1
        const maxRollValue = 20

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('It should roll a d100 die (1-100)', () => {
        const minRollValue = 1
        const maxRollValue = 100

        const dieValue = roll(maxRollValue)

        expect(dieValue).toBeGreaterThanOrEqual(minRollValue)
        expect(dieValue).toBeLessThanOrEqual(maxRollValue)
    })
    it('should throw an error if the die has 0 faces', () => {
        const dieFace = 0
        const expectedError =
            'A die must have at least 1 face, but got 0 faces.'

        expect(() => roll(dieFace)).toThrowError(expectedError)
    })
})
