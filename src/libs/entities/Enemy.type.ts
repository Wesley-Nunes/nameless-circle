import type { Character, CharacterType } from './Character.type'

export type Enemy = Character & {
    team: 'enemies'
    xp: number
    preferredTargets?: Array<CharacterType>
}
