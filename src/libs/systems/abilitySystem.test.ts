import { describe, it, expect } from 'vitest'
import getEnemyAbilities from './abilitySystem'

describe('abilitySystem', () => {
    it('should throw an error for an invalid template', () => {
        // @ts-expect-error  
        expect(() => getEnemyAbilities({}, 1)).toThrowError(
            `Invalid template: '{}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        // @ts-expect-error  
        expect(() => getEnemyAbilities({ a: 2, b: 3 }, 1)).toThrowError(
            `Invalid template: '{"a":2,"b":3}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        expect(() => getEnemyAbilities(
            // @ts-expect-error  
            { str: 'a', dex: 'b', con: 'c', int: 'd', wis: 'e', cha: 'f' }, 1)
        ).toThrowError(
            `Invalid template: '{"str":"a","dex":"b","con":"c","int":"d","wis":"e","cha":"f"}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        expect(() => getEnemyAbilities(
            { str: -2, dex: 1, con: 2, int: 3, wis: 1, cha: 2 }, 1)
        ).toThrowError(
            `Invalid template: '{"str":-2,"dex":1,"con":2,"int":3,"wis":1,"cha":2}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        expect(() => getEnemyAbilities(
            { str: 2, dex: 0, con: 2, int: 3, wis: 1, cha: 2 }, 1)
        ).toThrowError(
            `Invalid template: '{"str":2,"dex":0,"con":2,"int":3,"wis":1,"cha":2}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )
    })
    it('should throw an error for an invalid xp', () => {
        expect(() => getEnemyAbilities(
            // @ts-expect-error  
            { str: 2, dex: 1, con: 2, int: 3, wis: 1, cha: 2 }, 'lorem')
        ).toThrowError(`Invalid xp: 'lorem'. Value must be a positive number.`)

        expect(() => getEnemyAbilities(
            { str: 2, dex: 1, con: 2, int: 3, wis: 1, cha: 2 }, -2)
        ).toThrowError(`Invalid xp: '-2'. Value must be a positive number.`)

        expect(() => getEnemyAbilities(
            { str: 2, dex: 1, con: 2, int: 3, wis: 1, cha: 2 }, 0)
        ).toThrowError(`Invalid xp: '0'. Value must be a positive number.`)
    })
})

