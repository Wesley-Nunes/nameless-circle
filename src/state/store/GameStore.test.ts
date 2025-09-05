import { expect, describe, it } from 'vitest'

import GameStore from './GameStore'
import { PLAYER_ID } from 'game/data/static/heroes'

describe('GameStore', () => {
    it("should add a mount to the player's when called", () => {
        const gameStore = new GameStore()

        gameStore.handleInkFunction(
            'add_mount',
            'Riding horse',
            PLAYER_ID,
            'heroes'
        )

        const heroesHasMounts = gameStore.handleInkFunction(
            'has_mounts',
            'heroes'
        )
        expect(heroesHasMounts).toBeTruthy()

        const mountTeam = gameStore.handleInkFunction(
            'get_mount_info',
            PLAYER_ID,
            'team'
        )
        const mountIdOwner = gameStore.handleInkFunction(
            'get_mount_info',
            PLAYER_ID,
            'ownerId'
        )
        const mountHp = gameStore.handleInkFunction(
            'get_mount_info',
            PLAYER_ID,
            'hp'
        )

        expect(mountTeam).toBe('heroes')
        expect(mountIdOwner).toBe(PLAYER_ID)
        expect(mountHp).toBeGreaterThan(0)
    })
    it('should return 0/false when the mount is not found', () => {
        const gameStore = new GameStore()

        const mountOwnerId = gameStore.handleInkFunction(
            'get_mount_info',
            PLAYER_ID,
            'ownerId'
        )
        const heroesHasMounts = gameStore.handleInkFunction(
            'has_mounts',
            'heroes'
        )

        expect(mountOwnerId).toBe(0)
        expect(heroesHasMounts).toBeFalsy()
    })
    it('should run a complete combat from initiation to completion', () => {
        const gameStore = new GameStore()

        const combatStatus01 = gameStore.handleInkFunction('get_combat_status')
        expect(combatStatus01).toBe('UNINITIALIZED')

        const combatId = 'blazefen_ambush_01'
        gameStore.setPlayerName('Celcius')
        gameStore.handleInkFunction('add_to_hero_party', 'hero_0002')
        gameStore.handleInkFunction('set_combat', combatId)

        const combatStatus02 = gameStore.handleInkFunction('get_combat_status')
        expect(combatStatus02).toBe('IN_PROGRESS')

        const heroParty = gameStore.handleInkFunction(
            'get_party_size',
            'heroes'
        )
        const enemyParty = gameStore.handleInkFunction(
            'get_party_size',
            'enemies'
        )
        expect(heroParty).toBe(2)
        expect(enemyParty).toBe(4)

        const charactersAlive = gameStore.handleInkFunction(
            'get_alive_characters_size',
            'heroes'
        )
        expect(charactersAlive).toBe(6)

        expect(gameStore.handleInkFunction('get_combat_round')).toBe(1)

        const isPlayerAction = gameStore.handleInkFunction('is_player_action')
        expect(isPlayerAction).toBeTypeOf('boolean')

        const emptyResult = gameStore.handleInkFunction('get_action_result', 0)
        expect(emptyResult).toBe('')

        for (let i = 1; i <= +charactersAlive!; i += 1) {
            if (gameStore.handleInkFunction('is_player_action')) {
                const enemyId = gameStore.handleInkFunction(
                    'get_character_info',
                    'enemies',
                    0,
                    'id'
                )
                gameStore.handleInkFunction('attack', enemyId)
            } else {
                gameStore.handleInkFunction('ai_action')
            }

            gameStore.handleInkFunction('end_turn')
        }
        const result = gameStore.handleInkFunction('get_action_result', 0)
        expect(result).toBeTypeOf('string')
        expect(result).toMatch(/^6\. .+$/)

        expect(gameStore.handleInkFunction('get_combat_round')).toBe(2)

        let counter = 0
        let aliveEnemyId = 0
        while (
            counter < 50 &&
            gameStore.handleInkFunction('get_combat_status') === 'IN_PROGRESS'
        ) {
            if (gameStore.handleInkFunction('is_player_action')) {
                const isEnemyAlive = gameStore.handleInkFunction(
                    'get_character_info',
                    'enemies',
                    aliveEnemyId,
                    'isAlive'
                )
                if (!isEnemyAlive) aliveEnemyId++

                const enemyId = gameStore.handleInkFunction(
                    'get_character_info',
                    'enemies',
                    aliveEnemyId,
                    'id'
                )
                gameStore.handleInkFunction('attack', enemyId)
            } else {
                gameStore.handleInkFunction('ai_action')
            }

            gameStore.handleInkFunction('end_turn')
            counter++
        }

        // Reset the combat status after finishing the combat
        expect(gameStore.handleInkFunction('get_combat_status')).toBe(
            'UNINITIALIZED'
        )

        const combatResult = gameStore.handleInkFunction(
            'get_combat_result',
            combatId
        )
        expect(combatResult).toBeOneOf([-1, 0, 1, 2])
    })
})
