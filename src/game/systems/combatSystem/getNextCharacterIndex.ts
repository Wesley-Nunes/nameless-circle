import type { Combatant } from 'game/types'

const getNextCharacterIndex = (
    orderedCharacters: Combatant[],
    currentIndex: number
): number => {
    let newIndex = currentIndex
    let keepGoing
    let typesAcc = orderedCharacters.length - 1

    do {
        newIndex = (newIndex + 1) % orderedCharacters.length

        typesAcc -= 1
        keepGoing = orderedCharacters[newIndex].hp <= 0 && typesAcc >= 0
    } while (keepGoing)

    if (orderedCharacters[newIndex].hp <= 0) {
        throw new Error(
            'All characters are dead.' +
                'Call getStatusCombat() to check combat status before invoking this function.'
        )
    }

    return newIndex
}

export default getNextCharacterIndex
