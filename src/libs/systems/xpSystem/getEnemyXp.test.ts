import { describe, it, expect } from 'vitest'
import getEnemyXp from './getEnemyXp'

describe('getEnemyXp', () => {
    it('returns highest XP enemy for single hero', () => {
        const party = [3]
        const enemyCount = 1;
        const expectedEnemyXp = [200]

        const result = getEnemyXp(party, enemyCount, 'moderate')

        expect(result).toEqual(expectedEnemyXp)
    })

    it('distributes XP for party and multiple enemies', () => {
        const party = [1, 1];
        const enemyCount = 2;
        const expectedEnemyXp = [50, 50]

        const result = getEnemyXp(party, enemyCount, 'low')

        expect(result).toEqual(expectedEnemyXp)
    })

    it('handles high difficulty correctly', () => {
        const party = [5]
        const enemyCount = 1
        const expectedEnemyXp = [1100]

        const result = getEnemyXp(party, enemyCount, 'high')

        expect(result).toEqual(expectedEnemyXp)
    })

    it('uses low difficulty when not specified', () => {
        const party = [2]
        const enemyCount = 1
        const expectedEnemyXp = [100]

        const result = getEnemyXp(party, enemyCount)

        expect(result).toEqual(expectedEnemyXp)
    })

    it('selects highest possible XP for exact budget match', () => {
        const party = [20, 20, 20]
        const enemyCount = 1

        const result = getEnemyXp(party, enemyCount, 'high')

        expect(result).toEqual([62000])
    })

    it('throws when enemies too strong for budget', () => {
        const party = [1]
        const enemyCount = 10

        expect(() => getEnemyXp(party, enemyCount)).toThrow(
            /No element in ENEMY_XP can form a group/
        )
    })
})

