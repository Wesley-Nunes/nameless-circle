import { player, lysandra } from 'game/data/static/heroes'

import type { Hero } from 'game/types'
import { addID } from 'game/systems/IDSystem'

const heroRegistry: Record<string, Hero> = {
    [player.id]: player,
    [lysandra.id]: lysandra
}

const getHeroById = (id: string): Hero => {
    const hero = structuredClone(heroRegistry[id])

    if (!hero) {
        throw new Error(`Hero id: ${id} not found`)
    }

    addID(hero.id)

    return hero
}

export default getHeroById
