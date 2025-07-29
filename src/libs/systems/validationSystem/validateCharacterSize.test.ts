import { describe, expect, it } from 'vitest'
import validateCharacterSize from './validateCharacterSize'

describe('validateCharacterSize', () => {
    it('should throw an error for an invalid character size value', () => {
        // @ts-expect-error  
        expect(() => validateCharacterSize('high'))
            .toThrowError("Invalid size: 'high'. Value must be a string from the CHARACTER_SIZE array.")
    })
})

