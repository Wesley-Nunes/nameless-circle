import { describe, expect, it } from 'vitest'
import validatePositiveNumber from './validatePositiveNumber'

describe('validatePositiveNumber', () => {
    it('should throw an error for an invalid numbers', () => {
        // @ts-expect-error - Intentionally testing an invalid type
        expect(() => validatePositiveNumber('alpha', 'damage'))
            .toThrowError("Invalid damage: 'alpha'. Must be a positive number.")

        expect(() => validatePositiveNumber(-2, 'points'))
            .toThrowError("Invalid points: '-2'. Must be a positive number.")

        expect(() => validatePositiveNumber(0, 'xp'))
            .toThrowError("Invalid xp: '0'. Must be a positive number.")
    })
})

