import { validateTemplate, validatePositiveNumber } from 'libs/systems/validationSystem'

import { ABILITY_KEYS } from 'libs/data/static/ability'

import type { AbilityBlock, AbilityKey, AbilityTemplate } from 'libs/entities'

const getEnemyAbilities = (template: AbilityTemplate, abilityPoints: number): AbilityBlock => {
    validateTemplate(template)
    validatePositiveNumber(abilityPoints, 'abilityPoints')

    const totalWeights = ABILITY_KEYS.reduce(
        (sum, ability) => sum + template[ability], 0
    )
    const abilityBlock: AbilityBlock = {
        str: { score: 0, modifier: 0 },
        con: { score: 0, modifier: 0 },
        dex: { score: 0, modifier: 0 },
        wis: { score: 0, modifier: 0 },
        int: { score: 0, modifier: 0 },
        cha: { score: 0, modifier: 0 }
    }
    const fractions: Partial<Record<AbilityKey, number>> = {}
    let totalBase = 0

    ABILITY_KEYS.forEach(ability => {
        const value = template[ability] * abilityPoints
        const base = Math.floor(value / totalWeights)

        abilityBlock[ability].score = base
        fractions[ability] = value % totalWeights
        totalBase += base
    })

    const remainder = abilityPoints - totalBase
    if (remainder > 0) {
        const sorted = [...ABILITY_KEYS].sort((a, b) =>
            fractions[b]! - fractions[a]! || ABILITY_KEYS.indexOf(a) - ABILITY_KEYS.indexOf(b)
        )
        for (let i = 0; i < remainder; i += 1) {
            abilityBlock[sorted[i]].score = abilityBlock[sorted[i]]!.score + 1
        }
    }

    ABILITY_KEYS.forEach(key => {
        abilityBlock[key].modifier = Math.floor((abilityBlock[key].score - 10) / 2)
    })

    return abilityBlock
}

export default getEnemyAbilities

