import { describe, it, expect } from 'vitest'

import getCombat from './getCombat'

describe('getCombat - Functional Tests', () => {
    it('creates valid combat with fixed test enemy', () => {
        const expectedCombatId = 'test_combat_01'
        const expectedWinConditions = [
            {
                isAlive: false,
                quantity: 1,
                team: 'enemies'
            }
        ]
        const heroParty = [{ level: 3 }, { level: 3 }, { level: 4 }]
        const difficulty = 'moderate'

        const combat = getCombat(expectedCombatId, heroParty, difficulty)

        expect(combat.id).toBe(expectedCombatId)
        expect(combat.winConditions).toEqual(expectedWinConditions)
        expect(combat.enemies).toHaveLength(1)

        const enemy = combat.enemies[0]
        expect(enemy.xp).toBe(10)
        expect(enemy.preferredTargets).toBeUndefined()
    })

    it('throws error for unknown combat ID', () => {
        const heroParty = [{ level: 3 }, { level: 3 }, { level: 4 }]

        expect(() => getCombat('unknown_combat', heroParty)).toThrowError(
            'Unknown combat ID: unknown_combat'
        )
    })
})
