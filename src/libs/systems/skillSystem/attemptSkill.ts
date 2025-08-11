import { roll } from 'libs/systems/rollSystem'

import type { ActionResult, Combatant, Skill } from 'libs/entities'

const attemptSkill = (
    character: Combatant,
    skill: Skill,
    dc: number,
    allyModifier: number = 0
): ActionResult => {
    const skillRoll = roll()
    const modifier = character.abilities[skill.modifier].modifier + allyModifier
    const totalValue = skillRoll + modifier

    if (totalValue >= dc) {
        return { success: true }
    }

    return { success: false }
}

export default attemptSkill
