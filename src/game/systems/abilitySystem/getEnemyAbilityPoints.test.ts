import { describe, expect, it } from 'vitest'
import getEnemyAbilityPoints from './getEnemyAbilityPoints'

describe('getEnemyAbilityPoints', () => {
    it('should return 60 abilities points for a xp 10 enemy', () => {
        const expectedValue = 60

        const value = getEnemyAbilityPoints(10)

        expect(value).toEqual(expectedValue)
    })
})
