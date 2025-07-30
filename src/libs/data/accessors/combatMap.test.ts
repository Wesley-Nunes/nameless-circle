import { describe, it, expect } from 'vitest'
import { getCombat } from './combatMap'

describe('getCombat - Functional Tests', () => {
    it('creates valid combat with enemies for known combat ID', () => {
        const expectedCombatId = 'blazefen_ambush_01'
        const expectedWinConditions = [{ type: 'save_all_mounts' }]
        const expectedEnemySize = 4
        const heroParty = [{ level: 3 }, { level: 3 }, { level: 4 }]
        const difficulty = 'moderate'

        // @ts-expect-error - Simple version of hero, the getCombat only uses the level property
        const combat = getCombat(expectedCombatId, heroParty, difficulty)

        expect(combat.id).toBe(expectedCombatId)
        expect(combat.winConditions).toEqual(expectedWinConditions)
        expect(combat.enemies).toHaveLength(expectedEnemySize)
    })

    it('throws error for unknown combat ID', () => {
        const heroParty = [{ level: 3 }, { level: 3 }, { level: 4 }]

        // @ts-expect-error - Simple version of hero, the getCombat only uses the level property
        expect(() => getCombat('unknown_combat', heroParty)).toThrowError(
            'Unknown combat ID: unknown_combat'
        )
    })
})

