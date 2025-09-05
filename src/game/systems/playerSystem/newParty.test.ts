import { describe, expect, it } from 'vitest'

import newParty from './newParty'

import type { Hero } from 'game/types'
import { addID } from '../IDSystem'

describe('newParty', () => {
    it.todo('successfully adds valid hero to party', () => {})
    it.todo('throws when old party size is invalid', () => {})
    it.todo('throws when new hero ID is invalid', () => {})
    it.todo('throws when new party size becomes invalid', () => {})
    it.todo('does not mutate original party', () => {})
    it.todo('handles adding to empty party', () => {})
})
