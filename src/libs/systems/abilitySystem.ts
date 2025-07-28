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
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers `)
    }
}
const validateXp = (xp: number) => {
    const isInvalid = !(typeof xp === 'number') || !(xp > 0)

    if (isInvalid) {
        throw new Error(`Invalid xp: '${xp}'. Value must be a positive number.`)
    }
}

const getEnemyAbilities = (template: AbilityTemplate, xp: number): AbilityCharacter => {
    validateTemplate(template)
    validateXp(xp)
}

export default getEnemyAbilities

