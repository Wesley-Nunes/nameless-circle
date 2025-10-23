import { expect, describe, it } from 'vitest'

import advantageRoll from './advantageRoll'

describe('advantageRoll', () => {
    it('should return the highest roll when rolling with advantage', () => {
        const minRollValue = 1
        const maxRollValue = 20

        const result = advantageRoll()

        expect(result.total).toBeGreaterThanOrEqual(minRollValue)
        expect(result.total).toBeLessThanOrEqual(maxRollValue)
        expect(Math.max(...result.rolls)).toBe(result.total)
    })
})
