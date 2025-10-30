import { expect, describe, it } from 'vitest'

import disadvantageRoll from './disadvantageRoll'

describe('disadvantageRoll', () => {
    it('should return the lowest roll when rolling with disadvantage', () => {
        const minRollValue = 1
        const maxRollValue = 20

        const result = disadvantageRoll()

        expect(result.total).toBeGreaterThanOrEqual(minRollValue)
        expect(result.total).toBeLessThanOrEqual(maxRollValue)
        expect(Math.min(...result.rolls)).toBe(result.total)
    })
})
