import type { AbilityKey } from './Ability.type'

export type Skill = {
    id: string
    name: string
    modifier: AbilityKey
}

export type SkillSceneChallenge = { turn: number; skills: Skill[]; dc: number }

export type SkillSceneMap = Record<string, SkillSceneChallenge[]>
