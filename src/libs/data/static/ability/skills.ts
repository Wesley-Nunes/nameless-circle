import type { Skill } from 'libs/entities'

export const animalHandling: Readonly<Skill> = {
    id: 'animalHandling',
    name: 'Animal handling',
    modifier: 'wis'
}

export const investigation: Readonly<Skill> = {
    id: 'investigation',
    name: 'Investigation',
    modifier: 'int'
}

export const perception: Readonly<Skill> = {
    id: 'perception',
    name: 'Perception',
    modifier: 'wis'
}

export const stealth: Readonly<Skill> = {
    id: 'stealth',
    name: 'Stealth',
    modifier: 'dex'
}

export const survival: Readonly<Skill> = {
    id: 'survival',
    name: 'Survival',
    modifier: 'wis'
}
