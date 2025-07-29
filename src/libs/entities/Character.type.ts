import type { Action } from './Action.type'
import type { Item } from './Item.type'
import type { Race } from './Race.type'

export type CharacterSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'

export type Character = {
    ability: {
        str: { score: number, modifier: number },
        dex: { score: number, modifier: number },
        con: { score: number, modifier: number },
        int: { score: number, modifier: number },
        wis: { score: number, modifier: number },
        cha: { score: number, modifier: number }
    };
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
    type: Array<'humanoid' | 'elemental' | 'beast'>,
}

