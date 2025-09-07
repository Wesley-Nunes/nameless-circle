import { describe, expect, it } from 'vitest'

import validateHeroPartySize from './validateHeroPartySize'

import { getHeroById } from 'game/data/accessors'

describe('validateHeroPartySize', () => {
    it('should not throw for party size of 3', () => {
        const party = [
            getHeroById('hero_0001'),
            getHeroById('hero_0002'),
            getHeroById('hero_0003')
        ]

        expect(() => validateHeroPartySize(party)).not.toThrow()
    })
    it('should throw error when party size exceeds 3', () => {
        const party = [
            getHeroById('hero_0001'),
            getHeroById('hero_0002'),
            getHeroById('hero_0003'),
            getHeroById('hero_0004')
        ]
        const expectedError = new Error(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )

        expect(() => validateHeroPartySize(party)).toThrow(expectedError)
    })
})
