import type { Character } from './Character.type'

export type Enemy = Character & {
    team: 'enemies';
    xp: number;
    preferredTargets?: Array<'humanoid' | 'elemental' | 'beast'>
}

