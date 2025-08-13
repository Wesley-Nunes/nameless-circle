import { roll } from 'libs/systems/rollSystem'

import type { ActionResult } from 'libs/entities'

const generateAttemptSkillSentence = (
    skillName: string,
    attemptSkillResult: ActionResult
): string => {
    const success_phrases = [
        'You succeed with flawless precision!',
        'A triumphant victory surges through you!',
        'Against all odds, you master the challenge!',
        'You perform with astonishing skill!',
        'Perfect execution! You make it look effortless.',
        'The universe bends to your expertise!',
        'You achieve exactly what you envisioned!'
    ]

    const failure_phrases = [
        'You stumble catastrophically!',
        'Failure! Consequences crash down around you...',
        'The task overwhelms your capabilities!',
        'Your efforts collapse disastrously!',
        'Fate cruelly denies your attempt!',
        "You're brutally reminded of your limitations!",
        'Everything goes horribly wrong!'
    ]
    const randomIndex = roll(7) - 1
    const outcome = attemptSkillResult.success
        ? success_phrases[randomIndex]
        : failure_phrases[randomIndex]
    const skillSentence = `Skill Check (${skillName}): ${outcome}`

    return skillSentence
}

export default generateAttemptSkillSentence
