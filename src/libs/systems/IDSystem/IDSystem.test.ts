import { describe, expect, it } from 'vitest'
import generateID from './generateID'

describe('generateID', () => {
    it('should generate two distinct unique IDs for a blazefen entity', () => {
        const expectedFirstBlazefenID = 'blazefen_0001'
        const expectedSecondsBlazefenID = 'blazefen_0002'

        const firstBlazefenId = generateID('blazefen')
        const secondBlazefenId = generateID('blazefen')

        expect(firstBlazefenId).toEqual(expectedFirstBlazefenID)
        expect(secondBlazefenId).toEqual(expectedSecondsBlazefenID)
    })
})

