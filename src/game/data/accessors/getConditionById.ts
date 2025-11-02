import { CONDITION_MAP } from 'game/data/static/conditions'

import type { Condition, ConditionId } from 'game/types'

const getConditionById = (conditionId: ConditionId): Condition => {
    const condition = CONDITION_MAP[conditionId]

    if (!condition) {
        throw new Error(`Condition id: ${conditionId} not found`)
    }

    return condition
}

export default getConditionById
