import { describe, expect, it } from 'vitest'

import findTarget from './findTarget'

import { getHeroById } from 'game/data/accessors'
import { createEnemy, createMount } from 'game/data/factories'
import { COMMONER_BASE } from 'game/data/static/enemies'

describe('findTarget', () => {
    it('should have the hero NPC target the enemy with the lowest HP', () => {
        const heroes = [getHeroById('hero_0001'), getHeroById('hero_0002')]
        const weakestEnemyConfig = {
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
        const strongestEnemyConfig = {
            abilities: {
                str: { score: 16, modifier: 3 },
                dex: { score: 14, modifier: 2 },
                con: { score: 16, modifier: 3 },
                int: { score: 11, modifier: 0 },
                wis: { score: 13, modifier: 1 },
                cha: { score: 10, modifier: 0 }
            },
            xp: 450
        }
        const enemies = [
            createEnemy(COMMONER_BASE, weakestEnemyConfig),
            createEnemy(COMMONER_BASE, strongestEnemyConfig)
        ]
        const party = [...heroes, ...enemies]
        const expectedEnemy = enemies[0] // The enemy with the lower hp

        const target = findTarget(heroes[1], party)

        expect(target).toStrictEqual(expectedEnemy)
    })
    it('should target strongest hero', () => {
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
        const party = [...heroes, ...enemies]
        const expectedHero = heroes[1] // The hero with the higher hp

        const target = findTarget(enemies[0], party)

        expect(target).toStrictEqual(expectedHero)
    })
    it('should ignore dead characters', () => {
        const heroes = [getHeroById('hero_0001'), getHeroById('hero_0002')]
        const weakestEnemyConfig = {
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
        const deadWeakestEnemy = {
            ...createEnemy(COMMONER_BASE, weakestEnemyConfig),
            hp: 0,
            isAlive: false
        }
        const intermediateEnemyConfig = {
            abilities: {
                str: { score: 15, modifier: 2 },
                dex: { score: 14, modifier: 2 },
                con: { score: 12, modifier: 1 },
                int: { score: 10, modifier: 0 },
                wis: { score: 12, modifier: 1 },
                cha: { score: 12, modifier: 1 }
            },
            xp: 200
        }
        const strongestEnemyConfig = {
            abilities: {
                str: { score: 16, modifier: 3 },
                dex: { score: 14, modifier: 2 },
                con: { score: 16, modifier: 3 },
                int: { score: 11, modifier: 0 },
                wis: { score: 13, modifier: 1 },
                cha: { score: 10, modifier: 0 }
            },
            xp: 450
        }
        const enemies = [
            deadWeakestEnemy,
            createEnemy(COMMONER_BASE, intermediateEnemyConfig),
            createEnemy(COMMONER_BASE, strongestEnemyConfig)
        ]
        const party = [...heroes, ...enemies]
        const expectedEnemy = enemies[1] // The alive enemy with the lower hp

        const target = findTarget(heroes[1], party)

        expect(target).toStrictEqual(expectedEnemy)
    })
    it('should throw error for invalid team', () => {
        expect(() => {
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
            const invalidTeamCharacter = { ...COMMONER_BASE, team: 'invalid' }
            const party = [...heroes, ...enemies, invalidTeamCharacter]
            const expectedHero = heroes[1] // The hero with the higher hp

            // @ts-expect-error - Intentionally testing an invalid type
            const target = findTarget(invalidTeamCharacter, party)

            expect(target).toStrictEqual(expectedHero)
        }).toThrowError('Team not found')
    })
    it('should prioritize preferred target type (Beast)', () => {
        const heroes = [getHeroById('hero_0001'), getHeroById('hero_0002')]
        const beastMount = createMount('Riding horse', heroes[0].id, 'heroes')
        const enemyConfig = {
            abilities: {
                str: { score: 15, modifier: 2 },
                dex: { score: 14, modifier: 2 },
                con: { score: 12, modifier: 1 },
                int: { score: 10, modifier: 0 },
                wis: { score: 12, modifier: 1 },
                cha: { score: 12, modifier: 1 }
            },
            xp: 200
        }
        const enemy = createEnemy(COMMONER_BASE, enemyConfig)
        enemy.preferredTargets = ['beast']
        const party = [...heroes, beastMount, enemy]

        const target = findTarget(enemy, party)

        expect(target).toStrictEqual(beastMount)
    })
})
