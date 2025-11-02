const CONDITION_MAP = {
    condition_0001: {
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
    },
    condition_0002: {
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
    },
    condition_0003: {
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
}

export default CONDITION_MAP
