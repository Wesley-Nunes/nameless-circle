import { describe, expect, it } from 'vitest'
import validateEnemyXp from './validateEnemyXp'

describe('validateEnemyXp', () => {
    it('should throw an error for an invalid xp value', () => {
        // @ts-expect-error  
        expect(() => validateEnemyXp('high'))
            .toThrowError("Invalid xp: 'high'. Value must be a number from the ENEMY_XP array.")

        expect(() => validateEnemyXp(222))
            .toThrowError("Invalid xp: '222'. Value must be a number from the ENEMY_XP array.")
    })
})

