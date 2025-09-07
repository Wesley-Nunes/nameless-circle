import { describe, expect, it } from 'vitest'

import validatePartySize from './validatePartySize'

import { type Character } from 'game/types'

const mockCharacter: Character = {
    abilities: {
        str: {
            score: 10,
            modifier: 0
        },
        con: {
            score: 10,
            modifier: 0
        },
        dex: {
            score: 10,
            modifier: 0
        },
        wis: {
            score: 10,
            modifier: 0
        },
        int: {
            score: 10,
            modifier: 0
        },
        cha: {
            score: 10,
            modifier: 0
        }
    },
    actions: [],
    armorClass: 10,
    hp: 10,
    id: 't_0001',
    isAlive: true,
    weapon: {
        id: 'longsword_0001',
        name: 'Longsword',
        range: 'melee',
        dice: { count: 1, sides: 8, modifier: 3 }
    },
    name: 'Test',
    species: 'human',
    size: 'medium',
    team: 'heroes',
    type: ['humanoid']
}

describe('validatePartySize', () => {
    it('throws error for empty party', () => {
        const party: Character[] = []

        expect(() => validatePartySize(party)).toThrowError(
            'The party size should be two or greater'
        )
    })
    it('throws error for single-character party', () => {
        const party: Character[] = [{ ...mockCharacter }]

        expect(() => validatePartySize(party)).toThrowError(
            'The party size should be two or greater'
        )
    })
    it("doesn't throw for valid party size (2 characters)", () => {
        const party: Character[] = [
            { ...mockCharacter },
            { ...mockCharacter, id: '2' }
        ]

        expect(() => validatePartySize(party)).not.toThrow()
    })
    it("doesn't throw for larger valid party (5 characters)", () => {
        const party = Array(5)
            .fill(null)
            .map((_, i) => ({ ...mockCharacter, id: String(i + 1) }))

        expect(() => validatePartySize(party)).not.toThrow()
    })
})
