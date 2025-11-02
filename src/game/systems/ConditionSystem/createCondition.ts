import type { Character, Condition } from 'game/types'

const createCondition = (
    character: Character,
    conditionId: string,
    duration?: number
): Condition => {
    return {
        id: 'condition_0001',
        name: 'Rage',
        duration: {
            turns: 1,
            extension: ['attack', 'enemy_saving_throw', 'bonusAction']
        },
        effects: {
            resistance: ['bludgeoning', 'piercing', 'slashing'],
            advantage: ['strength_checks', 'strength_saves'],
            spellcaster: false,
            concentration: false,
            rage_damage_bonus: 2
        }
    }
}

export default createCondition
