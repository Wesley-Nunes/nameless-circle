import { beforeEach, expect, describe, it } from 'vitest'

import GameStore from './GameStore'
import { calculateEnemyHp } from 'game/systems/hpSystem'
import { resetID } from 'game/systems/IDSystem'

import type { CharacterSize } from 'game/types'

describe('GameStore', () => {
    let gameStore: GameStore

    beforeEach(() => {
        gameStore = new GameStore()
        gameStore.setPlayerName('Celcius')
        resetID()
    })

    it.skip('should initialize combat state and process first action correctly', () => {})
    it.skip('should complete combat by processing turns until victory or defeat', () => {})
    it.skip('', () => {
        // set_combat
        // get_party_size
        // end_combat
        // add_to_hero_party
        // get_party_size
        // assert party_size 1 less then party_size 2
    })
    it.skip('test combat log with multiple characters')
    it('throws error for unhandled functions', () => {
        expect(() =>
            gameStore.handleInkFunction('invalid_function')
        ).toThrowError('Unhandled function: invalid_function')
    })
})
