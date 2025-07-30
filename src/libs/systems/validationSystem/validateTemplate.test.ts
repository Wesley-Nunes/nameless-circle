import { describe, expect, it } from 'vitest'
import validateTemplate from './validateTemplate'

describe('validateTemplate', () => {
    it('should throw an error for an invalid template', () => {
        // @ts-expect-error - Intentionally testing an invalid type
        expect(() => validateTemplate({})).toThrowError(
            `Invalid template: '{}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        // @ts-expect-error - Intentionally testing an invalid type
        expect(() => validateTemplate({ a: 2, b: 3 })).toThrowError(
            `Invalid template: '{"a":2,"b":3}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        expect(() => validateTemplate(
            // @ts-expect-error - Intentionally testing an invalid type
            { str: 'a', dex: 'b', con: 'c', int: 'd', wis: 'e', cha: 'f' })
        ).toThrowError(
            `Invalid template: '{"str":"a","dex":"b","con":"c","int":"d","wis":"e","cha":"f"}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        expect(() => validateTemplate(
            { str: -2, dex: 1, con: 2, int: 3, wis: 1, cha: 2 })
        ).toThrowError(
            `Invalid template: '{"str":-2,"dex":1,"con":2,"int":3,"wis":1,"cha":2}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )

        expect(() => validateTemplate(
            { str: 2, dex: 0, con: 2, int: 3, wis: 1, cha: 2 })
        ).toThrowError(
            `Invalid template: '{"str":2,"dex":0,"con":2,"int":3,"wis":1,"cha":2}'.
                        - Required keys: str, dex, con, int, wis, cha
                        - All values must be positive numbers`
        )
    })
})

