import { describe, it, expect } from 'vitest'

import getWeaponModifier from './getWeaponModifier'

import type { Weapon, AbilityBlock } from 'libs/entities'

describe('getWeaponModifier', () => {
    const mockAbilities: AbilityBlock = {
        str: { score: 15, modifier: 2 },
        dex: { score: 17, modifier: 3 },
        con: { score: 10, modifier: 0 },
        int: { score: 8, modifier: -1 },
        wis: { score: 12, modifier: 1 },
        cha: { score: 14, modifier: 2 }
    }

    it('returns strength modifier for melee weapons', () => {
        const meleeWeapon: Weapon = {
            id: 'w1',
            name: 'Longsword',
            range: 'melee',
            dice: { count: 1, sides: 8 }
        }

        const result = getWeaponModifier(meleeWeapon, mockAbilities)

        expect(result).toBe(mockAbilities.str.modifier)
    })

    it('returns dexterity modifier for ranged weapons', () => {
        const rangedWeapon: Weapon = {
            id: 'w2',
            name: 'Longbow',
            range: 'ranged',
            dice: { count: 1, sides: 8, modifier: 0 }
        }

        const result = getWeaponModifier(rangedWeapon, mockAbilities)

        expect(result).toBe(mockAbilities.dex.modifier)
    })
})
