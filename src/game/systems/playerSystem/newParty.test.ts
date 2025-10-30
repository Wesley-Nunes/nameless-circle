import { describe, expect, it } from 'vitest'

import newParty from './newParty'

import { getHeroById } from 'game/data/accessors'

describe('newParty', () => {
    it('successfully adds valid hero to party', () => {
        const oldParty = [getHeroById('hero_0001')]
        const availableHeroIds = ['hero_0001', 'hero_0002']
        const newHeroId = 'hero_0002'
        const expectedParty = [...oldParty, getHeroById('hero_0002')]

        const newHeroParty = newParty(oldParty, availableHeroIds, newHeroId)

        expect(newHeroParty).toStrictEqual(expectedParty)
    })
    it('throws when old party size is invalid', () => {
        expect(() => {
            const oldParty = [
                getHeroById('hero_0001'),
                getHeroById('hero_0002'),
                getHeroById('hero_0003'),
                getHeroById('hero_0004')
            ]
            const availableHeroIds = [
                'hero_0001',
                'hero_0002',
                'hero_0003',
                'hero_0004',
                'hero_0005'
            ]
            const newHeroId = 'hero_0005'

            newParty(oldParty, availableHeroIds, newHeroId)
        }).toThrowError(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )
    })
    it('throws when new hero ID is invalid', () => {
        expect(() => {
            const oldParty = [
                getHeroById('hero_0001'),
                getHeroById('hero_0002')
            ]
            const availableHeroIds = ['hero_0001', 'hero_0002', 'hero_0003']
            const newHeroId = 'hero_0004'

            newParty(oldParty, availableHeroIds, newHeroId)
        }).toThrowError(
            'Invalid (ID: hero_0004). Available IDs: hero_0001, hero_0002, hero_0003'
        )
    })
    it('throws when new party size becomes invalid', () => {
        expect(() => {
            const oldParty = [
                getHeroById('hero_0001'),
                getHeroById('hero_0002'),
                getHeroById('hero_0003')
            ]
            const availableHeroIds = [
                'hero_0001',
                'hero_0002',
                'hero_0003',
                'hero_0004'
            ]
            const newHeroId = 'hero_0004'

            newParty(oldParty, availableHeroIds, newHeroId)
        }).toThrowError(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )
    })
})
