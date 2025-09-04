import { ABILITY_KEYS } from 'game/data/static/ability'

import type { AbilityKey, AbilityTemplate } from 'game/types'

const validateTemplate = (template: AbilityTemplate) => {
    const isEmpty = !template || !Object.values(template).length
    const invalidKeys = !Object.keys(template).every(k =>
        ABILITY_KEYS.includes(k as AbilityKey)
    )
    const invalidValues = !Object.values(template).every(
        v => typeof v === 'number' && v > 0
    )
    const isInvalid = isEmpty || invalidKeys || invalidValues

    if (isInvalid) {
        throw new Error(`Invalid template: '${JSON.stringify(template)}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers `)
    }
}

export default validateTemplate
