import type { CONDITION_MAP } from 'game/data/static/conditions'

export type ConditionId = keyof typeof CONDITION_MAP
export type Condition = {
    id: ConditionId
    name: string
    duration: {
        turns: number
        extension?: string[]
    }
    effects: Record<string, any>
}
