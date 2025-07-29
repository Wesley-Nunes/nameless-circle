import { describe, it, expect } from 'vitest'

import createEnemy from './enemyFactory'
import { getEnemyAbilities } from 'libs/systems/abilitySystem'

import { BLAZEFEN_BASE, ENEMY_ROLE_TEMPLATES } from 'libs/data/static/enemies'

import type { Enemy } from 'libs/entities'

describe('enemyFactory - createEnemy', () => {
    it('should return a 10 XP blazefen sharpshooter', () => {
        const expectedEnemy: Enemy = {
            ability: {
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
            items: [],
            name: 'blazefen',
            race: 'blazefen',
            size: 'medium',
            team: 'enemies',
            type: ['elemental', 'humanoid'],
            xp: 10
        }

        const abilities = getEnemyAbilities(ENEMY_ROLE_TEMPLATES['sharpshooter'], 60)
        const enemy = createEnemy(abilities, BLAZEFEN_BASE, 10)

        // Mock the hp, because it returns a random value
        enemy.hp = 4

        expect(enemy).toStrictEqual(expectedEnemy)
    })
})

