import { describe, it, expect } from 'vitest'
import validatePlayerName from './validatePlayerName'

describe('validatePlayerName', () => {
    it('should not throw an error for valid names', () => {
        const validNames = ['Al', 'Max', 'PlayerOne', 'TenChars!!']

        validNames.forEach(name => {
            expect(() => validatePlayerName(name)).not.toThrow()
        })
    })
    it('should throw an error for non-string inputs', () => {
        const invalidInputs = [42, null, undefined, {}, []]

        invalidInputs.forEach(input => {
            // @ts-expect-error: Testing invalid inputs
            expect(() => validatePlayerName(input)).toThrow(
                'Player name must be a string'
            )
        })
    })
    it('should throw an error for names shorter than 2 characters', () => {
        const shortNames = ['', 'A']

        shortNames.forEach(name => {
            expect(() => validatePlayerName(name)).toThrow(
                'Player name must be at least 2 characters long'
            )
        })
    })
    it('should throw an error for names longer than 10 characters', () => {
        const longNames = ['ThisIsTooLong', 'VeryLongName!!']

        longNames.forEach(name => {
            expect(() => validatePlayerName(name)).toThrow(
                'Player name must be no more than 10 characters long'
            )
        })
    })
    it('should handle exactly 2 and 10 character names correctly', () => {
        const edgeCases = ['AB', 'ExactlyTen']

        edgeCases.forEach(name => {
            expect(() => validatePlayerName(name)).not.toThrow()
        })
    })
})
