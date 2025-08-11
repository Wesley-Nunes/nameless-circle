import { describe, it, expect, vi, afterEach } from 'vitest'

import * as rollSystem from 'libs/systems/rollSystem'

import { getHeroById } from 'libs/data/accessors'
import { PLAYER_ID } from 'libs/data/static/heroes'
import { perception, stealth, animalHandling } from 'libs/data/static/ability'

import attemptSkill from './attemptSkill'

describe('attemptSkill', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should succeed when total roll meets DC exactly (DEX skill)', () => {
        const rollSpy = vi.spyOn(rollSystem, 'roll').mockReturnValue(11)
        const character = getHeroById(PLAYER_ID)
        const dc = 14

        const result = attemptSkill(character, stealth, dc)

        expect(rollSpy).toHaveBeenCalled()
        expect(result).toEqual({ success: true })
    })
    it('should succeed when total roll exceeds DC (WIS skill)', () => {
        const rollSpy = vi.spyOn(rollSystem, 'roll').mockReturnValue(15)
        const character = getHeroById(PLAYER_ID)
        const dc = 15

        const result = attemptSkill(character, perception, dc)

        expect(rollSpy).toHaveBeenCalled()
        expect(result).toEqual({ success: true })
    })
    it('should fail when total roll is below DC', () => {
        const rollSpy = vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
        const character = getHeroById(PLAYER_ID)
        const dc = 5

        const result = attemptSkill(character, animalHandling, dc)

        expect(rollSpy).toHaveBeenCalled()
        expect(result).toEqual({ success: false })
    })
    it('should succeed with ally modifier when base roll would fail', () => {
        const rollSpy = vi.spyOn(rollSystem, 'roll').mockReturnValue(10)
        const character = getHeroById(PLAYER_ID)
        const dc = 14
        const allyModifier = 1

        const result = attemptSkill(character, stealth, dc, allyModifier)

        expect(rollSpy).toHaveBeenCalled()
        expect(result).toEqual({ success: true })
    })
    it('should fail with ally modifier when total still below DC', () => {
        const rollSpy = vi.spyOn(rollSystem, 'roll').mockReturnValue(1)
        const character = getHeroById(PLAYER_ID)
        const dc = 10
        const allyModifier = 2

        const result = attemptSkill(character, perception, dc, allyModifier)

        expect(rollSpy).toHaveBeenCalled()
        expect(result).toEqual({ success: false })
    })
    it('should use correct ability modifier for different skills', () => {
        vi.spyOn(rollSystem, 'roll').mockReturnValue(10)
        const character = getHeroById(PLAYER_ID)
        const dcDex = 13
        const dcWis = 12

        const dexResult = attemptSkill(character, stealth, dcDex)
        const wisResult = attemptSkill(character, perception, dcWis)

        expect(dexResult).toEqual({ success: true })
        expect(wisResult).toEqual({ success: false })
    })
})
