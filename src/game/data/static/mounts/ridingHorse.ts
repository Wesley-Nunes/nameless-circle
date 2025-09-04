import type { Mount } from 'game/entities'

const ridingHorse: Mount = {
    abilities: {
        str: { score: 16, modifier: 3 },
        dex: { score: 13, modifier: 1 },
        con: { score: 12, modifier: 1 },
        int: { score: 2, modifier: -4 },
        wis: { score: 11, modifier: 0 },
        cha: { score: 7, modifier: -2 }
    },
    actions: ['ATTACK'],
    armorClass: 11,
    availability: 'TRAINING',
    id: 'ridingHorse_',
    isTamedMount: false,
    hp: 13,
    isAlive: true,
    name: 'Riding horse',
    ownerId: '',
    size: 'large',
    species: 'equine',
    team: 'neutral',
    type: ['beast'],
    weapon: {
        id: 'hooves_0001',
        name: 'hooves',
        dice: { count: 1, sides: 8, modifier: 3 },
        range: 'melee'
    }
}

export default ridingHorse
