import { describe, it, expect } from 'vitest'

import getCombatStatus from './getCombatStatus'

import type { Hero, Enemy } from 'game/types'

describe('getCombatStatus', () => {
    it.todo('returns UNINITIALIZED when characters is undefined', () => {})
    it.todo('returns VICTORY when all enemies are defeated', () => {})
    it.todo('returns VICTORY when no enemies exist', () => {})
    it.todo('returns DEFEAT when all heroes are defeated', () => {})
    it.todo('returns DEFEAT when no heroes exist', () => {})
    it.todo('returns IN_PROGRESS when both teams have living members', () => {})
    it.todo(
        'returns IN_PROGRESS when at least one hero and one enemy are alive',
        () => {}
    )
})
