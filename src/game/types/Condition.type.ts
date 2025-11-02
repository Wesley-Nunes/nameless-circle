export type Condition = {
    id: string
    name: string
    duration: {
        turns: number
        extension?: string[]
    }
    effects: Record<string, any>
}
