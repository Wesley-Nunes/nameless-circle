import {
    validateHeroId,
    validateHeroPartySize
} from 'game/systems/validationSystem'
import { getHeroById } from 'game/data/accessors'

import type { Hero } from 'game/entities'

const newParty = (
    oldParty: Hero[],
    availableHeroIds: string[],
    newHeroId: string
): Hero[] => {
    validateHeroPartySize(oldParty)
    validateHeroId(availableHeroIds, newHeroId)

    const newParty: Hero[] = oldParty.map(hero => structuredClone(hero))
    const newHero: Hero = getHeroById(newHeroId)

    newParty.push(newHero)

    validateHeroPartySize(newParty)

    return newParty
}

export default newParty
