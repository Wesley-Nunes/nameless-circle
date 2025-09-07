import type { AbilityBlock, Weapon } from 'game/types'

const getWeaponModifier = (
    weapon: Weapon,
    characterAbilities: AbilityBlock
): number => {
    if (weapon.range === 'melee') {
        return characterAbilities.str.modifier
    } else if (weapon.range === 'ranged') {
        return characterAbilities.dex.modifier
    }

    return 0
}

export default getWeaponModifier
