import type { AbilityBlock } from './Ability.type'
import type { Action } from './Action.type'
import type { Weapon } from './Weapon.type'
import type { Species } from './Species.type'
import type { Team } from './Team.type'

export type CharacterSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'

export type CharacterType = 'humanoid' | 'elemental' | 'beast'

export type Character = {
    abilities: AbilityBlock;
    actions: Action[];
    armorClass: number;
    hp: number
    id: string;
    isAlive: boolean;
    // NOTE: Equipment & Inventory should be developed to improve this feature
    weapon: Weapon;
    name: string;
    species: Species,
    size: CharacterSize,
    team: Team;
    type: Array<CharacterType>,
}

