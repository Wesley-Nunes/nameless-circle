import { describe, it, expect } from 'vitest'

import getNextCharacterIndex from './getNextCharacterIndex'

import type { Hero, Enemy } from 'game/types'

describe('getNextCharacterIndex', () => {
    it.todo('returns next index when next character is alive', () => {})
    it.todo('skips dead characters and returns next alive index', () => {})
    it.todo('wraps around to start when at end of array', () => {})
    it.todo('should throw an error when all characters are dead', () => {})
    it.todo('handles consecutive dead characters correctly', () => {})
    it.todo(
        'returns same position when only one character remains alive',
        () => {}
    )
})
