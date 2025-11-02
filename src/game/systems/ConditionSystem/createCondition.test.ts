import { expect, describe, it } from 'vitest'

import { getHeroById } from 'game/data/accessors'

import createCondition from './createCondition'

import type { Character, Condition } from 'game/types'

describe('createCondition', () => {
    it('should return the rage condition', () => {
        const char: Character = getHeroById('hero_0001')
        const conditionId = 'condition_0001'
        const expectedCondition: Condition = {
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

        const rageCondition = createCondition(char, conditionId)

        expect(rageCondition).toStrictEqual(expectedCondition)
    })
    it('should return the prone condition', () => {
        const char: Character = getHeroById('hero_0001')
        const conditionId = 'condition_0002'
        const expectedCondition: Condition = {
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

        const proneCondition = createCondition(char, conditionId)

        expect(proneCondition).toStrictEqual(expectedCondition)
    })
    it('should return the bardic inspiration condition', () => {
        const char: Character = getHeroById('hero_0001')
        const conditionId = 'condition_0003'
        const expectedCondition: Condition = {
            id: 'condition_0003',
            name: 'Bardic inspiration',
            duration: {
                turns: 10
            },
            effects: {
                inspiration_die: 'd6',
                can_add_to_failed_check: true,
                max_stacks: 1
            }
        }

        const bardicInspirationCondition = createCondition(char, conditionId)

        expect(bardicInspirationCondition).toStrictEqual(expectedCondition)
    })
})
