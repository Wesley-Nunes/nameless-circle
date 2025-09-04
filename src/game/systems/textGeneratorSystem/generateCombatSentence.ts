import { roll } from 'game/systems/rollSystem'

import type {
    ActionResult,
    DamageResult,
    Enemy,
    Hero,
    Mount
} from 'game/entities'

const generateCombatSentence = (
    attacker: Enemy | Hero | Mount,
    target: Enemy | Hero | Mount,
    attackResult: ActionResult,
    damageResult?: DamageResult
): string => {
    const criticalHitMessage = [
        `${attacker.name} critically annihilates ${target.name} for ${damageResult?.damage} damage!`,
        `${attacker.name}'s devastating blow crushes ${target.name} (${damageResult?.oldHp} → ${damageResult?.newHp} HP)!`,
        `${attacker.name} brutally smashes ${target.name} with a critical hit, dealing ${damageResult?.damage} damage!`,
        `${attacker.name} lands a catastrophic strike on ${target.name} (${damageResult?.oldHp} → ${damageResult?.newHp} HP)!`
    ]
    const hitMessage = [
        `${attacker.name} strikes ${target.name} for ${damageResult?.damage} damage.`,
        `${attacker.name}'s attack hits ${target.name} (${damageResult?.oldHp} → ${damageResult?.newHp} HP).`,
        `${attacker.name} wounds ${target.name} with a solid strike, dealing ${damageResult?.damage} damage.`,
        `${attacker.name} damages ${target.name} in combat (${damageResult?.oldHp} → ${damageResult?.newHp} HP).`
    ]
    const missMessage = [
        `${attacker.name}'s attack misses ${target.name}.`,
        `${target.name} nimbly dodges ${attacker.name}'s assault.`,
        `${attacker.name} fails to hit the agile ${target.name}.`,
        `${target.name} evades ${attacker.name}'s attack completely.`
    ]

    const deathMessage =
        damageResult && !damageResult.stillAlive
            ? ` ${target.name} has been defeated!`
            : ''

    const randomIndex = roll(4) - 1

    if (attackResult.success) {
        if (attackResult.critical) {
            return criticalHitMessage[randomIndex] + deathMessage
        }
        return hitMessage[randomIndex] + deathMessage
    }
    return missMessage[randomIndex]
}

export default generateCombatSentence
