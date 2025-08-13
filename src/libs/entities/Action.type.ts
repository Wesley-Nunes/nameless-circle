import type { Skill } from './Skill.type'

// NOTE: This probably should be an system
// An action system will use the stats to do the action
export type Action = 'ATTACK' | Skill

export type ActionResult = { success: boolean; critical?: boolean }
