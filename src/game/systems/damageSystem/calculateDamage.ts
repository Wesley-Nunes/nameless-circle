import { getWeaponModifier } from 'game/systems/abilitySystem'
import { roll } from 'game/systems/rollSystem'

import type { Enemy, Hero, Mount } from 'game/types'

const calculateDamage = (
    attacker: Hero | Enemy | Mount,
    isCriticalDamage: boolean = false
): number => {
    const count = isCriticalDamage
        ? attacker.weapon.dice.count * 2
        : attacker.weapon.dice.count
    const attackerModifier = getWeaponModifier(
        attacker.weapon,
        attacker.abilities
    )
    let damage = attackerModifier + (attacker.weapon.dice.modifier || 0)

    for (let i = 1; i <= count; i += 1) {
        damage += roll(attacker.weapon.dice.sides)
    }

    return damage
}

export default calculateDamage
