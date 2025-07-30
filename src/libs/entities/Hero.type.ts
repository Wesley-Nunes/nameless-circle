import type { Character } from './Character.type'

export type Hero = Character & {
    team: 'heroes';
    level: number;
}

