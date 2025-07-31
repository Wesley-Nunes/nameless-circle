import { describe, expect, it } from 'vitest'
import validateInteger from './validateIntegerNumber'

describe('validateInteger', () => {
    it.each([-Number.MAX_SAFE_INTEGER, -100, -10, 1, 10, 100, Number.MAX_SAFE_INTEGER])(
        'should accept valid positive integer: %i',
        (value) => {
            const paramName = 'testParam'

            expect(() => validateInteger(value, paramName)).not.toThrow()
        }
    )

    it.each([
        { value: 3.14, description: 'decimal number' },
        { value: NaN, description: 'NaN' },
        { value: Infinity, description: 'infinity' },
        { value: -Infinity, description: 'negative infinity' },
        { value: '10' as unknown as number, description: 'numeric string' },
        { value: null, description: 'null' },
        { value: undefined, description: 'undefined' },
        { value: {}, description: 'object' },
    ])('should reject $description: $value', ({ value }) => {
        const paramName = 'testParam'
        const expectedError = `Invalid ${paramName}: '${value}'. Must be an integer.`

        // @ts-expect-error - Intentionally testing an invalid type
        expect(() => validateInteger(value, paramName)).toThrowError(expectedError)
    })
})

