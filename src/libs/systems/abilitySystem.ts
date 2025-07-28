type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha'
type AbilityTemplate = Record<AbilityKey, number>
type AbilityCharacter = Record<AbilityKey, { score: number, modifier: number }>

const validateTemplate = (template: AbilityTemplate) => {
    const keys: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']
    const isEmpty = !template || !Object.values(template).length
    const invalidKeys = !Object.keys(template).every((k) => keys.includes(k as AbilityKey))
    const invalidValues = !Object.values(template).every((v) => typeof v === 'number' && v > 0)

    const isInvalid = isEmpty || invalidKeys || invalidValues
    if (isInvalid) {
        throw new Error(`Invalid template: '${JSON.stringify(template)}'.
                        - Expected keys: str, dex, con, int, wis, cha
                        - Expected values: Non-negative number`)
    }
}
const getEnemyAbilities = (template: AbilityTemplate, xp: number): AbilityCharacter => {
    validateTemplate(template)
}

export default getEnemyAbilities

