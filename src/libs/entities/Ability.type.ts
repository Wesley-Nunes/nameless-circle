export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
export type AbilityTemplate = Record<AbilityKey, number>
export type AbilityScores = { score: number, modifier: number }
export type AbilityBlock = Record<AbilityKey, AbilityScores>
