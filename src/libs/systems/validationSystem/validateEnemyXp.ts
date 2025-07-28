import { ENEMY_XP } from 'libs/data/static/enemies'

const validateEnemyXp = (xp: number) => {
    if (typeof xp !== 'number' || !ENEMY_XP[xp]) {
        throw new Error(`Invalid xp: '${xp}'. Value must be a number from the ENEMY_XP array.`)
    }
}

export default validateEnemyXp

