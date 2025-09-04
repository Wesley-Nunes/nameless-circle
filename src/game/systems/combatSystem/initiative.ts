import { roll } from 'game/systems/rollSystem'
import { validatePartySize } from 'game/systems/validationSystem'

import type { Character } from 'game/entities'

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
