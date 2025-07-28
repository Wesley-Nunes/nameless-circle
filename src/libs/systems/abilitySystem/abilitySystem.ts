import { validateTemplate, validatePositiveNumber } from 'libs/systems/validationSystem'

import type { AbilityBlock, AbilityTemplate } from 'libs/entities'


const getEnemyAbilities = (template: AbilityTemplate, abilityPoints: number): AbilityBlock => {
    validateTemplate(template)
    validatePositiveNumber(abilityPoints, 'abilityPoints')

    // TODO:
    // 1. Transform xp in abilities points
    // 2. Apply the points in a distribution
    // 3. Calculate the modifiers
    // 4. Return the correct object
}

export default getEnemyAbilities

