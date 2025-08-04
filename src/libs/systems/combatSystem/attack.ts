import { getWeaponModifier } from 'libs/systems/abilitySystem'
import { roll } from 'libs/systems/rollSystem'

import type { Enemy, Hero, } from 'libs/entities'

const attack = (attacker: Hero | Enemy, target: Hero | Enemy): { hit: boolean, critical: boolean } => {
    const attackRoll = roll()
    const modifier = getWeaponModifier(attacker.weapon, attacker.abilities)
    const totalAttack = attackRoll + modifier

    if (attackRoll === 20) {
        return { hit: true, critical: true }
    }
    if (attackRoll === 1) {
        return { hit: false, critical: false }
    }
    if (totalAttack >= target.armorClass) {
        return { hit: true, critical: false }
    }

    return { hit: false, critical: false }
}

export default attack

