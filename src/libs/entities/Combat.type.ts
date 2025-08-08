import type { Combatant } from './Combatant.type';
import type { Difficulty } from './Difficulty.type'
import type { Enemy } from './Enemy.type'

export type CombatStatus = 'UNINITIALIZED' | 'IN_PROGRESS' | 'VICTORY' | 'DEFEAT'

export type WinCondition = ({ quantity: number } & Partial<Combatant>)[]

export type CombatTemplate = {
    id: string;
    enemies: (heroLevels: number[], difficulty: Difficulty) => Enemy[];
    winConditions: WinCondition
}

export type Combat = Omit<CombatTemplate, 'enemies'> & { enemies: Enemy[] }

