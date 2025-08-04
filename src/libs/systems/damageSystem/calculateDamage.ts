import { getWeaponModifier } from 'libs/systems/abilitySystem'
import { roll } from 'libs/systems/rollSystem'

import type { Enemy, Hero } from 'libs/entities'

const calculateDamage = (attacker: Hero | Enemy, isCriticalDamage: boolean): number => {
    const count = isCriticalDamage ? attacker.weapon.dice.count * 2 : attacker.weapon.dice.count
    const attackerModifier = getWeaponModifier(attacker.weapon, attacker.abilities)
    let damage = attackerModifier + (attacker.weapon.dice.modifier || 0)

    for (let i = 1; i <= count; i += 1) {
        damage += roll(attacker.weapon.dice.sides)
    }

    return damage
}

export default calculateDamage

