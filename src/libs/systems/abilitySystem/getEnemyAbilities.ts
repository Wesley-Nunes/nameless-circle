import { validateTemplate, validatePositiveNumber } from 'libs/systems/validationSystem'

import type { AbilityBlock, AbilityKey, AbilityTemplate } from 'libs/entities'

const ABILITIES_KEYS: AbilityKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']

const getEnemyAbilities = (template: AbilityTemplate, abilityPoints: number): AbilityBlock => {
    validateTemplate(template)
    validatePositiveNumber(abilityPoints, 'abilityPoints')

    const totalWeights = ABILITIES_KEYS.reduce(
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

    ABILITIES_KEYS.forEach(ability => {
        const value = template[ability] * abilityPoints
        const base = Math.floor(value / totalWeights)

        abilityBlock[ability].score = base
        fractions[ability] = value % totalWeights
        totalBase += base
    })

    const remainder = abilityPoints - totalBase
    if (remainder > 0) {
        const sorted = [...ABILITIES_KEYS].sort((a, b) =>
            fractions[b]! - fractions[a]! || ABILITIES_KEYS.indexOf(a) - ABILITIES_KEYS.indexOf(b)
        )
        for (let i = 0; i < remainder; i += 1) {
            abilityBlock[sorted[i]].score = abilityBlock[sorted[i]]!.score + 1
        }
    }

    ABILITIES_KEYS.forEach(key => {
        abilityBlock[key].modifier = Math.floor((abilityBlock[key].score - 10) / 2)
    })

    return abilityBlock
}

export default getEnemyAbilities

