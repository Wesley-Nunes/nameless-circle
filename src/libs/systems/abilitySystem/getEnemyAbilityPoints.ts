import { validatePositiveNumber } from '../validationSystem'

const getEnemyAbilityPoints = (xp: number) => {
    validatePositiveNumber(xp, 'xp')


}

export default getEnemyAbilityPoints

