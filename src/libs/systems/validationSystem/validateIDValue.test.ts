import { describe, it, expect } from 'vitest'
import validateIDValue from './validateIDValue'

describe('validateIDValue', () => {
    it('should not throw when value is continuous (value = lastID + 1)', () => {
        const lastID = 5
        const continuousValue = lastID + 1

        expect(() => validateIDValue(lastID, continuousValue)).not.toThrow()
    })
    it('should not throw when value equals last registered ID', () => {
        const lastID = 5
        const sameValue = 5

        expect(() => validateIDValue(lastID, sameValue)).not.toThrow()
    })
    it('should not throw when value is less than last registered ID', () => {
        const lastID = 5
        const smallerValue = 3

        expect(() => validateIDValue(lastID, smallerValue)).not.toThrow()
    })
    it('should throw when value has a gap greater than 1', () => {
        const lastID = 5
        const gapValue = 7
        const expectedError = `The value should be continuous. Last value register was: ${lastID}`

        expect(() => validateIDValue(lastID, gapValue)).toThrowError(expectedError)
    })
    it('should include last ID value in error message', () => {
        const lastID = 10
        const gapValue = 15
        const expectedMessage = `Last value register was: ${lastID}`

        expect(() => validateIDValue(lastID, gapValue)).toThrowError(expectedMessage)
    })
    it('should throw for non-consecutive values with negative numbers', () => {
        const lastID = -3
        const gapValue = 0
        const expectedError = `The value should be continuous. Last value register was: ${lastID}`

        expect(() => validateIDValue(lastID, gapValue)).toThrowError(expectedError)
    })
})

