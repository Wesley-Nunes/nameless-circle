import type { Difficulty } from './Difficulty.type'
import type { Enemy } from './Enemy.type'

export type CombatTemplate = {
    id: string;
    enemies: (heroLevels: number[], difficulty: Difficulty) => Enemy[];
    winConditions: { basic: string, extra?: string }[]
}

export type Combat = Omit<CombatTemplate, 'enemies'> & { enemies: Enemy[] }

