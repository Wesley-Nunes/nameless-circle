export interface ItemI {
    id: string,
    name: string,
    range: 'melee' | 'ranged',
    dice: { count: number, sides: number, modifier?: number }
}

