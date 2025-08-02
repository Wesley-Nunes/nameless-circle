import { describe, expect, it } from 'vitest'
import validateSpecies from './validateSpecies'

describe('validateSpecies', () => {
    it('should throw an error when species is invalid', () => {
        // @ts-expect-error - Intentionally testing an invalid type
        expect(() => validateSpecies('high'))
            .toThrowError("Invalid species: 'high'.")
    })
})

