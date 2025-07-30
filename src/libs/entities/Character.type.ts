import type { AbilityBlock } from './Ability.type'
import type { Action } from './Action.type'
import type { Item } from './Item.type'
import type { Race } from './Race.type'

export type CharacterSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'

export type CharacterType = 'humanoid' | 'elemental' | 'beast'

export type Character = {
    abilities: AbilityBlock;
    actions: Action[];
    armorClass: number;
    hp: number
    id: string;
    isAlive: boolean;
    items: Item[];
    name: string;
    race: Race,
    size: CharacterSize,
    team: 'heroes' | 'enemies';
    type: Array<CharacterType>,
}

