import type { ActionsI } from "./ActionsI.type";

export interface CharacterI {
    id: string,
    isAlive: boolean,
    team: 'heroes' | 'enemies',
    dexModifier: number,
    actions: ActionsI[],
    items: [{ id: string }]
}

