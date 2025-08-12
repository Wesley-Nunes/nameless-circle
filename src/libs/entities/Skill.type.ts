import type { AbilityKey } from './Ability.type'

export type Skill = {
    id: string
    name: string
    modifier: AbilityKey
}

export type SkillSceneProgression = {
    turn: number
    skills: Skill[]
    dc: number
}

export type SkillSceneReward = { type: string; items: string[] }

export type SkillSceneChallenge = {
    skillSceneProgression: SkillSceneProgression[]
    reward: SkillSceneReward
}

export type SkillSceneMap = Record<string, SkillSceneChallenge>
