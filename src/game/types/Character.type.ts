import type { AbilityBlock } from './Ability.type'
import type { Action } from './Action.type'
import type { Weapon } from './Weapon.type'
import type { Species } from './Species.type'
import type { Team } from './Team.type'
import type { Condition } from './Condition.type'

export type CharacterSize =
    | 'tiny'
    | 'small'
    | 'medium'
    | 'large'
    | 'huge'
    | 'gargantuan'

export type CharacterType = 'humanoid' | 'elemental' | 'beast'

export type Character = {
    abilities: AbilityBlock
    actions: Action[]
    armorClass: number
    conditions: Condition[]
    hp: number
    id: string
    isAlive: boolean
    name: string
    size: CharacterSize
    species: Species
    team: Team
    type: Array<CharacterType>
    // NOTE: Equipment & Inventory should be developed to improve this feature
    weapon: Weapon
}
