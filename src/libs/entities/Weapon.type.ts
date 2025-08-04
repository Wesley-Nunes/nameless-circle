export type Weapon = {
    id: string;
    name: string;
    range: 'melee' | 'ranged';
    dice: { count: number, sides: number, modifier?: number }
}

