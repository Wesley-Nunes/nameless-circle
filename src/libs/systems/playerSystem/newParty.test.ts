import { describe, it, expect } from 'vitest'

import newParty from './newParty'

import { HERO_TEST, HERO_TEST_ID } from 'libs/data/static/heroes/HERO_TEST'

import type { Hero } from 'libs/entities'


const createTestHero = (id: string, name: string): Hero => ({
    ...HERO_TEST,
    id,
    name,
})

describe('newParty', () => {
    const hero1 = createTestHero('hero1', 'Hero One')
    const hero2 = createTestHero('hero2', 'Hero Two')
    const hero3 = createTestHero('hero3', 'Hero Three')
    const hero4 = createTestHero('hero4', 'Hero Four')

    it('successfully adds valid hero to party', () => {
        const oldParty = [hero1, hero2]
        const availableHeroIds = [HERO_TEST_ID, 'hero5']
        const newHeroId = HERO_TEST_ID

        const result = newParty(oldParty, availableHeroIds, newHeroId)

        expect(result).toHaveLength(3)
        expect(result[2]).toEqual(HERO_TEST)
    })
    it('throws when old party size is invalid', () => {
        const oldParty = [hero1, hero2, hero3, hero4, createTestHero('hero5', 'Hero Five')]
        const availableHeroIds = [HERO_TEST_ID]
        const newHeroId = HERO_TEST_ID

        expect(() => newParty(oldParty, availableHeroIds, newHeroId))
            .toThrowError(/party size/i)
    })
    it('throws when new hero ID is invalid', () => {
        const oldParty = [hero1]
        const availableHeroIds = ['valid-id-1', 'valid-id-2']
        const newHeroId = 'invalid-hero-id'

        expect(() => newParty(oldParty, availableHeroIds, newHeroId))
            .toThrowError('Invalid (ID: invalid-hero-id). Available IDs: valid-id-1, valid-id-2')
    })
    it('throws when new party size becomes invalid', () => {
        const oldParty = [
            ...Array(3).fill(null).map((_, i) =>
                createTestHero(`max-hero-${i + 1}`, `Max Hero ${i + 1}`)
            ),
            hero4
        ]
        const availableHeroIds = [HERO_TEST_ID]
        const newHeroId = HERO_TEST_ID

        expect(() => newParty(oldParty, availableHeroIds, newHeroId))
            .toThrowError(/party size/i)
    })
    it('does not mutate original party', () => {
        const oldParty = [hero1, hero2]
        const availableHeroIds = [HERO_TEST_ID]
        const newHeroId = HERO_TEST_ID
        const originalPartySnapshot = [...oldParty]

        const result = newParty(oldParty, availableHeroIds, newHeroId)

        expect(result).not.toBe(oldParty)
        expect(oldParty).toHaveLength(2)
        expect(oldParty).toEqual(originalPartySnapshot)
        expect(result[0]).not.toBe(oldParty[0])
        expect(result[1]).not.toBe(oldParty[1])
        expect(result[0]).toEqual(oldParty[0])
        expect(result[1]).toEqual(oldParty[1])
    })
    it('handles adding to empty party', () => {
        const oldParty: Hero[] = []
        const availableHeroIds = [HERO_TEST_ID]
        const newHeroId = HERO_TEST_ID

        const result = newParty(oldParty, availableHeroIds, newHeroId)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual(HERO_TEST)
    })
})

