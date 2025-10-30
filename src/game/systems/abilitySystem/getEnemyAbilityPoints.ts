import { validateEnemyXp } from 'game/systems/validationSystem'
import { ENEMY_XP } from 'game/data/static/enemies'

const getEnemyAbilityPoints = (xp: number) => {
    validateEnemyXp(xp)

    // NOTE: Starting with the simplest implementation first.
    // The math logic needs refinement.
    // See #26 for more info
    const abilitiesPoints = 60 + 3 * ENEMY_XP.findIndex(i => i === xp)

    return abilitiesPoints
}

export default getEnemyAbilityPoints
