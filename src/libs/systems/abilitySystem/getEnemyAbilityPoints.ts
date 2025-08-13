import { validateEnemyXp } from 'libs/systems/validationSystem'
import { ENEMY_XP } from 'libs/data/static/enemies'

const getEnemyAbilityPoints = (xp: number) => {
    validateEnemyXp(xp)

    // NOTE: Starting with the simplest implementation first.
    // The math logic needs refinement.
    const abilitiesPoints = 60 + 3 * ENEMY_XP.findIndex(i => i === xp)

    return abilitiesPoints
}

export default getEnemyAbilityPoints
