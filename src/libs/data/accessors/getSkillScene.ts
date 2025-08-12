import {
    animalHandling,
    investigation,
    perception,
    stealth,
    survival
} from 'libs/data/static/ability'

import type { Hero, SkillSceneChallenge, SkillSceneMap } from 'libs/entities'

const SKILL_SCENE_MAP: SkillSceneMap = {
    // NOTE: The reward could be improved to follow the storyline
    steal_horses_01: {
        skillSceneProgression: [
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
        ],
        reward: {
            type: 'mounts',
            items: ['Riding horse', 'Riding horse']
        }
    }
}

const getSkillScene = (
    skillSceneId: string,
    player: Hero
): SkillSceneChallenge => {
    const skillScene = SKILL_SCENE_MAP[skillSceneId]

    if (!skillScene) {
        throw new Error(`Unknown skill scene ID: ${skillSceneId}`)
    }

    const playerSkillIds = player.actions
        .filter(action => typeof action === 'object' && action.id)
        .map(action => typeof action === 'object' && action.id)
    const skillSceneProgression = skillScene.skillSceneProgression.map(
        sceneSkills => ({
            ...sceneSkills,
            skills: sceneSkills.skills.filter(skill =>
                playerSkillIds.includes(skill.id)
            )
        })
    )
    const skillSceneChallenge = {
        ...skillScene,
        skillSceneProgression
    }

    return skillSceneChallenge
}

export default getSkillScene
