import {
    validateCharacterSize,
    validateEnemyXp
} from 'game/systems/validationSystem'

import type { CharacterSize } from 'game/types'

const calculateEnemyHp = (
    xp: number,
    size: CharacterSize,
    conMod: number = 0
) => {
    validateEnemyXp(xp)
    validateCharacterSize(size)

    const xpSizeHpMap: Partial<Record<number, Record<CharacterSize, number>>> =
        {
            10: {
                tiny: 1,
                small: 1,
                medium: 1,
                large: 2,
                huge: 2,
                gargantuan: 2
            },
            25: {
                tiny: 2,
                small: 2,
                medium: 2,
                large: 2,
                huge: 2,
                gargantuan: 2
            },
            50: {
                tiny: 4,
                small: 4,
                medium: 3,
                large: 3,
                huge: 3,
                gargantuan: 3
            },
            100: {
                tiny: 4,
                small: 4,
                medium: 4,
                large: 3,
                huge: 3,
                gargantuan: 3
            },
            200: {
                tiny: 6,
                small: 6,
                medium: 5,
                large: 4,
                huge: 4,
                gargantuan: 4
            },
            450: {
                tiny: 5,
                small: 5,
                medium: 6,
                large: 6,
                huge: 6,
                gargantuan: 6
            }
            // TBD: XP > 450
        }
    const sizeDieMap = {
        tiny: 4,
        small: 6,
        medium: 8,
        large: 10,
        huge: 12,
        gargantuan: 20
    }

    const dieFace = sizeDieMap[size]
    const numDice = xpSizeHpMap[xp]![size]
    const conBonus = numDice * conMod
    const avgDieValue = (1 + dieFace) / 2
    const avgHp = Math.floor(numDice * avgDieValue + conBonus)
    const maxRollHp = numDice * dieFace + conBonus
    const hp = Math.max(1, avgHp)
    const maxHp = Math.max(1, maxRollHp)
    const randomHp = hp + Math.ceil(Math.random() * (maxHp - hp))

    let formula: string
    if (conBonus > 0) {
        formula = `${numDice}d${dieFace} + ${conBonus}`
    } else if (conBonus < 0) {
        formula = `${numDice}d${dieFace} - ${Math.abs(conBonus)}`
    } else {
        formula = `${numDice}d${dieFace}`
    }

    return {
        hp,
        maxHp,
        randomHp,
        formula: formula,
        numDice: numDice,
        dieFace: dieFace,
        conBonus: conBonus
    }
}

export default calculateEnemyHp
