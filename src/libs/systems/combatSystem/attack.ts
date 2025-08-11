import { getWeaponModifier } from 'libs/systems/abilitySystem'
import { roll } from 'libs/systems/rollSystem'

import type { ActionResult, Enemy, Hero, Mount } from 'libs/entities'

const attack = (
    attacker: Hero | Enemy | Mount,
    target: Hero | Enemy | Mount
): ActionResult => {
    const attackRoll = roll()
    const modifier = getWeaponModifier(attacker.weapon, attacker.abilities)
    const totalAttack = attackRoll + modifier

    if (attackRoll === 20) {
        return { success: true, critical: true }
    }
    if (attackRoll === 1) {
        return { success: false, critical: false }
    }
    if (totalAttack >= target.armorClass) {
        return { success: true, critical: false }
    }

    return { success: false, critical: false }
}

export default attack
