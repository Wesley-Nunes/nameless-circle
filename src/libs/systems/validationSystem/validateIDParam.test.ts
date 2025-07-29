import { describe, expect, it } from 'vitest'
import validateIDParam from './validateIDParam'

describe('validateIDParam', () => {
    it('should throw an error when id parameter is invalid', () => {
        // @ts-expect-error  
        expect(() => validateIDParam('high'))
            .toThrowError("Invalid id parameter: 'high'.")
    })
})

