import { describe, expect, it, vi } from 'vitest'

import attack from './attack'
import * as rollSystem from 'libs/systems/rollSystem'

import type { Hero, Enemy } from 'libs/entities'

const hero: Hero = {
    id: 'hero-001',
    name: 'hero-test',
    species: 'human',
    level: 1,
    abilities: {
        str: { score: 10, modifier: 0 },
        dex: { score: 16, modifier: 9 },
        con: { score: 14, modifier: 2 },
        int: { score: 12, modifier: 1 },
        wis: { score: 13, modifier: 1 },
        cha: { score: 8, modifier: -1 }
    },
    armorClass: 14,
    hp: 14,
    isAlive: true,
    weapon: {
        id: 'shortbow-001',
        name: 'Shortbow',
        range: 'ranged',
        dice: { count: 1, sides: 6, modifier: 3 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'heroes',
    type: ['humanoid'],
}
const enemy: Enemy = {
    id: 'enemy-001',
    name: 'enemy-test',
    species: 'human',
    abilities: {
        str: { score: 10, modifier: 0 },
        dex: { score: 16, modifier: 9 },
        con: { score: 14, modifier: 2 },
        int: { score: 12, modifier: 1 },
        wis: { score: 13, modifier: 1 },
        cha: { score: 8, modifier: -1 }
    },
    armorClass: 14,
    hp: 14,
    isAlive: true,
    weapon: {
        id: 'shortbow-001',
        name: 'Shortbow',
        range: 'ranged',
        dice: { count: 1, sides: 6, modifier: 3 }
    },
    actions: ['ATTACK'],
    size: 'medium',
    team: 'enemies',
    type: ['humanoid'],
    xp: 0,
}

describe('attack function', () => {
    it('CRITICAL HIT: returns {hit: true, critical: true} on natural 20', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValueOnce(20)

        const attacker = hero
        const target = enemy

        const result = attack(attacker, target)
        expect(result).toEqual({ hit: true, critical: true })
    })
    it('CRITICAL MISS: returns {hit: false, critical: false} on natural 1', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValueOnce(1)

        const attacker = hero
        const target = enemy

        const result = attack(attacker, target)
        expect(result).toEqual({ hit: false, critical: false })
    })
    it('HIT: returns {hit: true, critical: false} when total meets armor class (melee)', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValueOnce(15)

        const attacker: Hero = {
            ...hero,
            abilities: {
                ...hero.abilities, str: { score: 16, modifier: 3 }
            },
            weapon: {
                ...hero.weapon, range: 'melee'
            }
        }
        const target = { ...enemy, armorClass: 18 }

        const result = attack(attacker, target)
        expect(result).toEqual({ hit: true, critical: false })
    })
    it('MISS: returns {hit: false, critical: false} when total < armor class (ranged)', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValueOnce(11)

        const attacker: Enemy = {
            ...enemy,
            abilities: {
                ...enemy.abilities,
                dex: { score: 14, modifier: 2 }
            },
            weapon: { ...enemy.weapon, range: 'ranged' }
        }
        const target = {
            ...hero,
            armorClass: 14
        }

        const result = attack(attacker, target)
        expect(result).toEqual({ hit: false, critical: false })
    })
    it('HIT: uses strength modifier for melee weapons', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValueOnce(10)

        const attacker: Hero = {
            ...hero,
            abilities: {
                ...hero.abilities,
                str: { score: 18, modifier: 4 },
                dex: { score: 14, modifier: 2 }
            },
            weapon: { ...hero.weapon, range: 'melee' }
        }
        const target: Enemy = {
            ...enemy,
            armorClass: 14
        }

        const result = attack(attacker, target)
        expect(result.hit).toBe(true)
    })
    it('HIT: uses dexterity modifier for ranged weapons', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValueOnce(8)

        const attacker: Enemy = {
            ...enemy,
            abilities: {
                ...enemy.abilities,
                str: { score: 8, modifier: -1 },
                dex: { score: 16, modifier: 3 }
            },
            weapon: { ...enemy.weapon, range: 'ranged' }
        }
        const target = {
            ...hero,
            armorClass: 11
        }

        const result = attack(attacker, target)
        expect(result.hit).toBe(true)
    })
})

