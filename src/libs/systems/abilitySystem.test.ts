import { describe, it, expect } from 'vitest'
import getEnemyAbilities from './abilitySystem'

describe('abilitySystem', () => {
    it('should throw an error for an invalid template', () => {
        // @ts-expect-error  
        expect(() => getEnemyAbilities({}, 1)).toThrowError(
            `Invalid template: '{}'.
                        - Expected keys: str, dex, con, int, wis, cha
                        - Expected values: Non-negative number`
        )

        // @ts-expect-error  
        expect(() => getEnemyAbilities({ a: 2, b: 3 }, 1)).toThrowError(
            `Invalid template: '{"a":2,"b":3}'.
                        - Expected keys: str, dex, con, int, wis, cha
                        - Expected values: Non-negative number`
        )

        expect(() => getEnemyAbilities(
            // @ts-expect-error  
            { str: 'a', dex: 'b', con: 'c', int: 'd', wis: 'e', cha: 'f' }, 1)
        ).toThrowError(
            `Invalid template: '{"str":"a","dex":"b","con":"c","int":"d","wis":"e","cha":"f"}'.
                        - Expected keys: str, dex, con, int, wis, cha
                        - Expected values: Non-negative number`
        )

        expect(() => getEnemyAbilities(
            { str: -2, dex: 1, con: 2, int: 3, wis: 1, cha: 2 }, 1)
        ).toThrowError(
            `Invalid template: '{"str":-2,"dex":1,"con":2,"int":3,"wis":1,"cha":2}'.
                        - Expected keys: str, dex, con, int, wis, cha
                        - Expected values: Non-negative number`
        )
    })
})

