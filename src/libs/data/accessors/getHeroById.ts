import { player, lysandra, HERO_TEST } from 'libs/data/static/heroes'

import type { Hero } from 'libs/entities'

const heroRegistry: Record<string, Hero> = {
    [player.id]: player,
    [lysandra.id]: lysandra,
    [HERO_TEST.id]: HERO_TEST
}

const getHeroById = (id: string): Hero => {
    const hero = heroRegistry[id]

    if (!hero) {
        throw new Error(`Hero id: ${id} not found`)
    }

    return hero
}

export default getHeroById

