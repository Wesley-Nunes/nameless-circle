import { describe, it, expect, vi, afterEach } from 'vitest'

import * as rollSystem from 'libs/systems/rollSystem'

import generateAttemptSkillSentence from './generateAttemptSkillSentence'

import type { ActionResult } from 'libs/entities'

describe('generateAttemptSkillSentence', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('calls roll(7) to get phrase index', () => {
        const rollSpy = vi.spyOn(rollSystem, 'roll').mockReturnValue(1)

        generateAttemptSkillSentence('Test', { success: true })

        expect(rollSpy).toHaveBeenCalledWith(7)
    })

    describe('successful attempts', () => {
        const successPhrases = [
            'You succeed with flawless precision!',
            'A triumphant victory surges through you!',
            'Against all odds, you master the challenge!',
            'You perform with astonishing skill!',
            'Perfect execution! You make it look effortless.',
            'The universe bends to your expertise!',
            'You achieve exactly what you envisioned!'
        ]

        successPhrases.forEach((phrase, index) => {
            const rollValue = index + 1

            it(`returns correct string for ${phrase} when roll = ${rollValue}`, () => {
                vi.spyOn(rollSystem, 'roll').mockReturnValue(rollValue)
                const skillName = 'Perception'
                const result: ActionResult = { success: true }

                const output = generateAttemptSkillSentence(skillName, result)

                expect(output).toBe(`Skill Check (${skillName}): ${phrase}`)
            })
        })
    })

    describe('failed attempts', () => {
        const failurePhrases = [
            'You stumble catastrophically!',
            'Failure! Consequences crash down around you...',
            'The task overwhelms your capabilities!',
            'Your efforts collapse disastrously!',
            'Fate cruelly denies your attempt!',
            "You're brutally reminded of your limitations!",
            'Everything goes horribly wrong!'
        ]

        failurePhrases.forEach((phrase, index) => {
            const rollValue = index + 1

            it(`returns correct string for ${phrase} when roll = ${rollValue}`, () => {
                vi.spyOn(rollSystem, 'roll').mockReturnValue(rollValue)
                const skillName = 'Stealth'
                const result: ActionResult = { success: false }

                const output = generateAttemptSkillSentence(skillName, result)

                expect(output).toBe(`Skill Check (${skillName}): ${phrase}`)
            })
        })
    })
})
