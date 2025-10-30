import { describe, it, expect } from 'vitest'

import getNextCharacterIndex from './getNextCharacterIndex'

import { createEnemy } from 'game/data/factories'
import { COMMONER_BASE } from 'game/data/static/enemies'
import { getHeroById } from 'game/data/accessors'

describe('getNextCharacterIndex', () => {
    it('returns next index when next character is alive', () => {
        const heroes = [getHeroById('hero_0001'), getHeroById('hero_0002')]
        const enemyConfig = {
            abilities: {
                str: { score: 15, modifier: 2 },
                dex: { score: 14, modifier: 2 },
                con: { score: 8, modifier: -1 },
                int: { score: 10, modifier: 0 },
                wis: { score: 12, modifier: 1 },
                cha: { score: 14, modifier: 2 }
            },
            xp: 10
        }
        const enemies = [createEnemy(COMMONER_BASE, enemyConfig)]
        const orderedParty = [...heroes, ...enemies]
        const currentIndex = 0
        const expectedNewIndex = 1

        const nextIndex = getNextCharacterIndex(orderedParty, currentIndex)

        expect(nextIndex).toEqual(expectedNewIndex)
    })
    it('skips dead characters and returns next alive index', () => {
        const heroes = [getHeroById('hero_0001'), getHeroById('hero_0002')]
        const enemyConfig = {
            abilities: {
                str: { score: 15, modifier: 2 },
                dex: { score: 14, modifier: 2 },
                con: { score: 8, modifier: -1 },
                int: { score: 10, modifier: 0 },
                wis: { score: 12, modifier: 1 },
                cha: { score: 14, modifier: 2 }
            },
            xp: 10
        }
        const deadEnemy = {
            ...createEnemy(COMMONER_BASE, enemyConfig),
            hp: 0,
            isAlive: false
        }
        const enemies = [deadEnemy, createEnemy(COMMONER_BASE, enemyConfig)]
        const orderedParty = [...heroes, ...enemies]
        const currentIndex = 1
        const expectedNewIndex = 3

        const nextIndex = getNextCharacterIndex(orderedParty, currentIndex)

        expect(nextIndex).toEqual(expectedNewIndex)
    })
    it('wraps around to start when at end of array', () => {
        const heroes = [getHeroById('hero_0001'), getHeroById('hero_0002')]
        const enemyConfig = {
            abilities: {
                str: { score: 15, modifier: 2 },
                dex: { score: 14, modifier: 2 },
                con: { score: 8, modifier: -1 },
                int: { score: 10, modifier: 0 },
                wis: { score: 12, modifier: 1 },
                cha: { score: 14, modifier: 2 }
            },
            xp: 10
        }
        const enemies = [createEnemy(COMMONER_BASE, enemyConfig)]
        const orderedParty = [...heroes, ...enemies]
        const currentIndex = 2
        const expectedNewIndex = 0

        const nextIndex = getNextCharacterIndex(orderedParty, currentIndex)

        expect(nextIndex).toEqual(expectedNewIndex)
    })
    it('should throw an error when all characters are dead', () => {
        expect(() => {
            const heroes = [
                { ...getHeroById('hero_0001'), hp: 0, isAlive: false },
                { ...getHeroById('hero_0002'), hp: 0, isAlive: false }
            ]
            const enemyConfig = {
                abilities: {
                    str: { score: 15, modifier: 2 },
                    dex: { score: 14, modifier: 2 },
                    con: { score: 8, modifier: -1 },
                    int: { score: 10, modifier: 0 },
                    wis: { score: 12, modifier: 1 },
                    cha: { score: 14, modifier: 2 }
                },
                xp: 10
            }
            const deadEnemy = {
                ...createEnemy(COMMONER_BASE, enemyConfig),
                hp: 0,
                isAlive: false
            }
            const enemies = [deadEnemy]
            const orderedParty = [...heroes, ...enemies]
            const currentIndex = 0

            getNextCharacterIndex(orderedParty, currentIndex)
        }).toThrowError(
            'All characters are dead.' +
                'Call getStatusCombat() to check combat status before invoking this function.'
        )
    })
})
