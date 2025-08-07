import { roll } from 'libs/systems/rollSystem'

import type { Enemy, Hero, Mount } from 'libs/entities'

const generateCombatSentence = (
    attacker: Enemy | Hero | Mount,
    target: Enemy | Hero | Mount,
    attackResult: { hit: boolean, critical: boolean }
): string => {
    const criticalHitMessage = [
        `${attacker.name} critically smashes ${target.name}!`,
        `Devastating hit! ${target.name} reels.`,
        `${attacker.name} brutalizes ${target.name}!`,
        `${attacker.name} annihilates ${target.name}!`
    ]
    const hitMessage = [
        `${attacker.name} hits ${target.name}.`,
        `${attacker.name} strikes the ${target.species}.`,
        `${target.name} takes damage.`,
        'Solid strike.'
    ]
    const missMessage = [
        `${attacker.name} misses.`,
        `${target.name} dodges!`,
        `${target.name} evades.`,
        'Attack fails.'
    ]
    const randomIndex = roll(4) - 1

    if (attackResult.hit && attackResult.critical) {
        return criticalHitMessage[randomIndex]
    }
    if (attackResult.hit && !attackResult.critical) {
        return hitMessage[randomIndex]
    }
    return missMessage[randomIndex]
}

export default generateCombatSentence

