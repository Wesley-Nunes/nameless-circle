import { describe, it, expect, vi, beforeEach } from 'vitest'

import { roll } from 'game/systems/rollSystem'
import calculateDamage from './calculateDamage'

import type { Hero, Weapon } from 'game/entities'

vi.mock('../rollSystem', () => ({
    roll: vi.fn().mockReturnValue(4)
}))

describe('calculateDamage', () => {
    const baseHero: Hero = {
        id: 'hero-001',
        name: 'Celcius',
        species: 'human',
        level: 1,
        abilities: {
            str: { score: 10, modifier: 0 },
            dex: { score: 16, modifier: 4 },
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
        isPlayer: true
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should calculate non-critical damage for ranged weapon', () => {
        const attacker = { ...baseHero }
        const isCriticalDamage = false

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(11)
        expect(roll).toHaveBeenCalledTimes(1)
        expect(roll).toHaveBeenCalledWith(6)
    })

    it('should calculate critical damage for ranged weapon', () => {
        const attacker = { ...baseHero }
        const isCriticalDamage = true

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(15)
        expect(roll).toHaveBeenCalledTimes(2)
    })

    it('should calculate damage for melee weapon using STR modifier', () => {
        const attacker = {
            ...baseHero,
            weapon: {
                ...baseHero.weapon,
                range: 'melee'
            } as Weapon
        }
        const isCriticalDamage = false

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(7)
    })

    it('should handle weapon without modifier property', () => {
        const attacker = {
            ...baseHero,
            weapon: {
                ...baseHero.weapon,
                dice: {
                    count: 1,
                    sides: 6
                }
            }
        }
        const isCriticalDamage = false

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(8)
    })

    it('should handle weapon with 0 modifier', () => {
        const attacker = {
            ...baseHero,
            weapon: {
                ...baseHero.weapon,
                dice: {
                    count: 1,
                    sides: 6,
                    modifier: 0
                }
            }
        }
        const isCriticalDamage = false

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(8)
    })

    it('should handle multiple dice rolls for critical hit', () => {
        const attacker = {
            ...baseHero,
            weapon: {
                ...baseHero.weapon,
                dice: {
                    count: 2,
                    sides: 8,
                    modifier: 1
                }
            }
        }
        const isCriticalDamage = true

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(21)
        expect(roll).toHaveBeenCalledTimes(4)
    })

    it('should handle multiple dice rolls for non-critical hit', () => {
        const attacker = {
            ...baseHero,
            weapon: {
                ...baseHero.weapon,
                dice: {
                    count: 2,
                    sides: 8,
                    modifier: 1
                }
            }
        }
        const isCriticalDamage = false

        const damage = calculateDamage(attacker, isCriticalDamage)

        expect(damage).toBe(13)
        expect(roll).toHaveBeenCalledTimes(2)
    })
})
