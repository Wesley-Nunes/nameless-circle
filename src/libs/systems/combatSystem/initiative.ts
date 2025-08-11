import { roll } from 'libs/systems/rollSystem'
import { validatePartySize } from 'libs/systems/validationSystem'

import type { Character } from 'libs/entities'

const initiative = (
    characters: Character[]
): { id: string; initiative: number }[] => {
    validatePartySize(characters)

    return characters
        .map(character => {
            const dexModifier = character.abilities.dex.modifier
            const initiative = roll() + dexModifier

            return { id: character.id, initiative, dexModifier }
        })
        .sort(
            (a, b) =>
                b.initiative - a.initiative || b.dexModifier - a.dexModifier
        )
}

export default initiative
