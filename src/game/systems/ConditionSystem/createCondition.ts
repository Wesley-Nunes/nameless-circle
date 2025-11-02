import { getConditionById } from 'game/data/accessors'

import type { Character, Condition, ConditionId } from 'game/types'

const createCondition = (
    character: Character,
    conditionId: ConditionId,
    duration?: number
): Condition => {
    return getConditionById(conditionId)
}

export default createCondition
