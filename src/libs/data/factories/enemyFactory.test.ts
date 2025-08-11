import { describe, it, expect } from 'vitest'

import createEnemy from './enemyFactory'
import { getEnemyAbilities } from 'libs/systems/abilitySystem'

import {
    BLAZEFEN_BASE,
    COMMONER_BASE,
    ENEMY_ROLE_TEMPLATES
} from 'libs/data/static/enemies'

import type { CharacterType, Enemy } from 'libs/entities'

describe('enemyFactory - createEnemy', () => {
    it('should return a 10 XP blazefen sharpshooter', () => {
        const expectedEnemy: Enemy = {
            abilities: {
                str: { score: 9, modifier: -1 },
                con: { score: 9, modifier: -1 },
                dex: { score: 14, modifier: 2 },
                wis: { score: 11, modifier: 0 },
                int: { score: 9, modifier: -1 },
                cha: { score: 8, modifier: -1 }
            },
            actions: ['ATTACK'],
            armorClass: 12,
            hp: 4,
            id: 'blazefen_0001',
            isAlive: true,
            weapon: {
                id: 'shortbow_0001',
                name: 'Shortbow',
                range: 'ranged',
                dice: { count: 1, sides: 6, modifier: 0 }
            },
            name: 'Vesmire',
            species: 'blazefen',
            size: 'medium',
            team: 'enemies',
            type: ['elemental', 'humanoid'],
            xp: 10
        }

        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )
        const enemy = createEnemy(BLAZEFEN_BASE, { abilities, xp: 10 })

        // Manual insert values, because it returns a random value
        enemy.hp = 4
        enemy.name = 'Vesmire'

        expect(enemy).toStrictEqual(expectedEnemy)
    })
    it('should create enemy with custom name', () => {
        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )
        const customName = "Zins' Than King"

        const enemy = createEnemy(BLAZEFEN_BASE, {
            abilities,
            xp: 10,
            name: customName
        })

        expect(enemy.name).toBe(customName)
    })
    it('should use random name when no custom name is provided', () => {
        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )

        const baseEnemyWithoutName = {
            ...BLAZEFEN_BASE,
            name: ''
        }

        const enemy = createEnemy(baseEnemyWithoutName, {
            abilities,
            xp: 10
        })

        expect(enemy.name).toBeDefined()
        expect(enemy.name).not.toBe('')
    })
    it('should use base enemy name when random name is not available', () => {
        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )
        const baseEnemyWithName = {
            ...COMMONER_BASE
        }

        const enemy = createEnemy(baseEnemyWithName, {
            abilities,
            xp: 10
        })

        expect(enemy.name).toBe('commoner')
    })
    it('should use base enemy species when all other name sources are unavailable', () => {
        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )

        const baseEnemyWithoutName = {
            ...COMMONER_BASE,
            name: ''
        }

        const enemy = createEnemy(baseEnemyWithoutName, {
            abilities,
            xp: 10
        })

        expect(enemy.name).toBe(COMMONER_BASE.species)
    })
    it('should create enemy with preferred targets', () => {
        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )
        const preferredTargets: Array<CharacterType> = ['humanoid']

        const enemy = createEnemy(BLAZEFEN_BASE, {
            abilities,
            xp: 10,
            preferredTargets
        })

        expect(enemy.preferredTargets).toEqual(preferredTargets)
    })
    it('should create enemy with both custom name and preferred targets', () => {
        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )
        const customName = 'Elite Blazefen'
        const preferredTargets: Array<CharacterType> = ['elemental', 'humanoid']

        const enemy = createEnemy(BLAZEFEN_BASE, {
            abilities,
            xp: 10,
            name: customName,
            preferredTargets
        })

        expect(enemy.name).toBe(customName)
        expect(enemy.preferredTargets).toEqual(preferredTargets)
    })
})
