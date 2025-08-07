import { beforeEach, describe, expect, it } from 'vitest'

import IDCounters from './IDCounters'
import generateID from './generateID'
import resetID from './resetID'

import type { IDKey } from 'libs/entities'

describe('generateID', () => {
    beforeEach(() => {
        resetID()
    })

    it('generates sequential IDs for valid keys', () => {
        const key: IDKey = 'hero'

        expect(generateID(key)).toBe('hero_0001')
        expect(generateID(key)).toBe('hero_0002')
        expect(IDCounters.hero).toBe(2)
    })
    it('handles multiple keys independently', () => {
        const keys: IDKey[] = ['blazefen', 'human', 'hero']

        keys.forEach(key => {
            expect(generateID(key)).toBe(`${key}_0001`)
            expect(generateID(key)).toBe(`${key}_0002`)
            expect(IDCounters[key]).toBe(2)
        })
    })
    it('throws error for invalid keys', () => {
        const invalidKey = 'invalid' as any

        expect(() => generateID(invalidKey)).toThrowError(
            `Invalid key: 'invalid'.`
        )
    })
})

