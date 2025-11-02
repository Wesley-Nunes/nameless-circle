import type { Character, Condition } from 'game/types'

const createCondition = (
    character: Character,
    conditionId: string,
    duration?: number
): Condition => {
    if (conditionId === 'condition_0001') {
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
    if (conditionId === 'condition_0002') {
        return {
            id: 'condition_0002',
            name: 'Prone',
            duration: {
                turns: 1,
                extension: ['no_stand_action_taken']
            },
            effects: {
                movement_cost: 'half_speed',
                attack_rolls: 'disadvantage',
                melee_attacks_against: 'advantage',
                ranged_attacks_against: 'disadvantage'
            }
        }
    }
}

export default createCondition
