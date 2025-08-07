import { beforeEach, describe, expect, it } from 'vitest'

import IDCounters from './IDCounters'
import generateID from './generateID'
import resetID from './resetID'

import type { IDKey } from 'libs/entities'

describe('resetID', () => {
    beforeEach(() => {
        resetID()
    })

    it('resets all counters to zero', () => {
        (Object.keys(IDCounters) as IDKey[]).forEach(key => {
            generateID(key)
            generateID(key)
        })

        resetID();

        (Object.keys(IDCounters) as IDKey[]).forEach(key => {
            expect(IDCounters[key]).toBe(0)
        })
    })
})

