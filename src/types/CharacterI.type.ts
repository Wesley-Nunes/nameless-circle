import type { ActionI } from './ActionI.type'
import type { ItemI } from './ItemI.type'

export interface CharacterI {
    id: string,
    isAlive: boolean,
    team: 'heroes' | 'enemies',
    dexModifier: number,
    strModifier: number,
    armorClass: number,
    actions: ActionI[],
    items: ItemI[],
    hp: number,
    exec: (action: ActionI, item: ItemI, target: CharacterI) => void,
}

