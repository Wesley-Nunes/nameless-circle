import { describe, expect, it } from 'vitest'

import validateHeroPartySize from './validateHeroPartySize'

import { getHeroById } from 'game/data/accessors'

import type { Hero } from 'game/types'

// TODO: Recreate the tests when more hero characters are available.
describe.skip('validateHeroPartySize', () => {
    const generateHeroes = (count: number): Hero[] => {
        return Array.from({ length: count }, (_, i) => ({
            ...getHeroById('hero_9999'),
            id: `hero_${i + 1}`
        }))
    }

    it.skip('should not throw for party size of 3', () => {
        const party = generateHeroes(3)

        expect(() => validateHeroPartySize(party)).not.toThrow()
    })
    it.skip('should not throw for party size below 3', () => {
        const partySizes = [0, 1, 2]

        partySizes.forEach(size => {
            const party = generateHeroes(size)

            expect(() => validateHeroPartySize(party)).not.toThrow()
        })
    })
    it.skip('should throw error when party size exceeds 3', () => {
        const party = generateHeroes(4)
        const expectedError = new Error(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )

        expect(() => validateHeroPartySize(party)).toThrow(expectedError)
    })
    it.skip('should throw specific error message for size 4', () => {
        const party = generateHeroes(4)

        expect(() => validateHeroPartySize(party)).toThrowError(
            /Maximum party size reached \(3 heroes\)/
        )
    })
    it.skip('should throw error for any size above 3', () => {
        const largeParty = generateHeroes(5)
        const expectedError = new Error(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )

        expect(() => validateHeroPartySize(largeParty)).toThrow(expectedError)
    })
})
