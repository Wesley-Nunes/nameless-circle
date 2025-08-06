import { beforeEach, expect, describe, it, vi } from 'vitest'

import GameStore from './GameStore'
import { calculateEnemyHp } from 'libs/systems/hpSystem'
import { resetID } from 'libs/systems/IDSystem'

import type { CharacterSize } from 'libs/entities'

vi.mock('libs/data/static/heroes/player', async () => {
    const { HERO_TEST, HERO_TEST_ID } = await vi.importActual
        <typeof import('libs/data/static/heroes/HERO_TEST')>('libs/data/static/heroes/HERO_TEST')

    return {
        player: HERO_TEST,
        PLAYER_ID: HERO_TEST_ID,
    }
})

describe('GameStore', () => {
    let gameStore: GameStore

    beforeEach(() => {
        gameStore = new GameStore()
        resetID()
    })

    it('should initialize combat state and process first action correctly', () => {
        const combatId = 'test_combat_01'
        const expectedPartySize = 1
        const expectedCombatStatus = 'IN_PROGRESS'
        const expectedHeroName = 'hero test'
        const expectedHeroHp = 13
        const expectedEnemyName = 'commoner'

        gameStore.handleInkFunction('set_combat', combatId)
        const heroPartySize = gameStore.handleInkFunction('get_party_size', 'heroes')
        const enemyPartySize = gameStore.handleInkFunction('get_party_size', 'enemies')
        const combatStatus = gameStore.handleInkFunction('get_combat_status')
        const heroName = gameStore.handleInkFunction('get_character_info', 'heroes', 0, 'name')
        const heroHp = gameStore.handleInkFunction('get_character_info', 'heroes', 0, 'hp')
        const enemyId = gameStore.handleInkFunction('get_character_info', 'enemies', 0, 'id') as string
        const enemyName = gameStore.handleInkFunction('get_character_info', 'enemies', 0, 'name')
        const enemyHp = gameStore.handleInkFunction('get_character_info', 'enemies', 0, 'hp')
        const enemyXp = gameStore.handleInkFunction('get_character_info', 'enemies', 0, 'xp')
        const enemySize = gameStore.handleInkFunction('get_character_info', 'enemies', 0, 'size')

        const expectedEnemyHp = calculateEnemyHp(enemyXp as number, enemySize as CharacterSize)

        expect(heroPartySize).toBe(expectedPartySize)
        expect(enemyPartySize).toBe(expectedPartySize)
        expect(combatStatus).toBe(expectedCombatStatus)
        expect(heroName).toBe(expectedHeroName)
        expect(heroHp).toBe(expectedHeroHp)
        expect(enemyName).toBe(expectedEnemyName)
        expect(enemyHp).toBeGreaterThanOrEqual(expectedEnemyHp.hp)
        expect(enemyHp).toBeLessThanOrEqual(expectedEnemyHp.maxHp)

        const expectedActionOrder = ['⚔️ commoner / ⏳ hero test', '⚔️ hero test / ⏳ commoner']
        const actionOrder = gameStore.handleInkFunction('get_action_order')
        expect(actionOrder).toSatisfy(value =>
            value === expectedActionOrder[0] || value === expectedActionOrder[1]
        )

        const isHeroAction = gameStore.handleInkFunction('is_player_action')
        expect(isHeroAction).toBeTypeOf('boolean')

        const actionResultOne = gameStore.handleInkFunction('get_action_result')
        expect(actionResultOne).toBeUndefined()

        if (isHeroAction) {
            gameStore.handleInkFunction('attack', enemyId!)
        } else {
            gameStore.handleInkFunction('ai_action')
        }

        const actionResultTwo = gameStore.handleInkFunction('get_action_result')
        expect(actionResultTwo).toBeDefined()
    })
    it('should complete combat by processing turns until victory or defeat', () => {
        const combatId = 'test_combat_01'

        gameStore.handleInkFunction('set_combat', combatId)

        while (gameStore.handleInkFunction('get_combat_status') === 'IN_PROGRESS') {
            if (gameStore.handleInkFunction('is_player_action')) {
                gameStore.handleInkFunction('attack', 'human_0001')
            } else {
                gameStore.handleInkFunction('ai_action')
            }

            gameStore.handleInkFunction('end_turn')
        }

        expect(gameStore.handleInkFunction('get_combat_status')).toSatisfy(value =>
            value === 'VICTORY' || value === 'DEFEAT'
        )
    })
    it.todo('', () => {
        // set_combat
        // get_party_size
        // end_combat
        // add_to_hero_party
        // get_party_size
        // assert party_size 1 less then party_size 2
    })
    it.todo('test combat log with multiple characters')
    it('throws error for unhandled functions', () => {
        expect(() => gameStore.handleInkFunction('invalid_function'))
            .toThrowError('Unhandled function: invalid_function')
    })
})
