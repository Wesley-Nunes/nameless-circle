import {
    animalHandling,
    investigation,
    perception,
    stealth,
    survival
} from 'libs/data/static/ability'

import type { Hero, SkillSceneChallenge, SkillSceneMap } from 'libs/entities'

const SKILL_SCENE_MAP: SkillSceneMap = {
    steal_horses_01: [
        {
            turn: 1,
            skills: [investigation, perception, stealth, survival],
            dc: 10
        },
        {
            turn: 2,
            skills: [investigation, perception, stealth, survival],
            dc: 10
        },
        {
            turn: 3,
            skills: [
                investigation,
                perception,
                stealth,
                survival,
                animalHandling
            ],
            dc: 10
        },
        {
            turn: 4,
            skills: [
                investigation,
                perception,
                stealth,
                survival,
                animalHandling
            ],
            dc: 10
        },
        {
            turn: 5,
            skills: [
                investigation,
                perception,
                stealth,
                survival,
                animalHandling
            ],
            dc: 10
        }
    ]
}

const getSkillScene = (
    skillSceneId: string,
    player: Hero
): SkillSceneChallenge[] => {
    const sceneSkills = SKILL_SCENE_MAP[skillSceneId]

    if (!sceneSkills) {
        throw new Error(`Unknown skill scene ID: ${skillSceneId}`)
    }

    const playerSkillIds = player.actions
        .filter(action => typeof action === 'object' && action.id)
        .map(action => typeof action === 'object' && action.id)
    const availableSkills = sceneSkills.map(sceneSkills => ({
        ...sceneSkills,
        skills: sceneSkills.skills.filter(skill =>
            playerSkillIds.includes(skill.id)
        )
    }))

    return availableSkills
}

export default getSkillScene
