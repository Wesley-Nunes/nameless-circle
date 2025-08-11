import { beforeEach, describe, expect, it } from 'vitest'

import addID from './addID'
import IDCounters from './IDCounters'
import generateID from './generateID'
import resetID from './resetID'

import type { IDKey } from 'libs/entities'

describe('addID', () => {
    beforeEach(() => {
        resetID()
    })

    it('updates counter when ID is the next sequential value', () => {
        const key: IDKey = 'blazefen'
        const id = 'blazefen_0001'

        addID(id)

        expect(IDCounters[key]).toBe(1)
    })
    it('ignores IDs with values lower than current counter', () => {
        const key: IDKey = 'human'
        generateID(key)
        const id = 'human_0001'

        addID(id)

        expect(IDCounters[key]).toBe(1)
    })
    it('throws error for non-sequential IDs', () => {
        const key: IDKey = 'hero'
        const id = 'hero_0002'

        expect(() => addID(id)).toThrowError(
            'The value should be continuous. Last value register was: 0'
        )
        expect(IDCounters[key]).toBe(0)
    })
    it('throws error for invalid keys', () => {
        const id = 'invalid_0001'

        expect(() => addID(id)).toThrowError("Invalid key: 'invalid'.")
    })
})
