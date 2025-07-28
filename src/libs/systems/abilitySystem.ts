type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
type AbilityTemplate = Record<AbilityKey, number>
type AbilityCharacter = Record<AbilityKey, { score: number, modifier: number }>

const getEnemyAbilities = (template: AbilityTemplate, xp: number): AbilityCharacter => { }

export default getEnemyAbilities

