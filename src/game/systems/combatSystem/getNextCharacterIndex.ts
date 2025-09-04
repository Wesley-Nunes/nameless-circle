import type { Enemy, Hero, Mount } from 'game/types'

const getNextCharacterIndex = (
    characters: (Hero | Enemy | Mount)[],
    currentIndex: number
): number => {
    let newIndex = currentIndex
    let keepGoing
    let typesAcc = characters.length - 1

    do {
        newIndex = (newIndex + 1) % characters.length

        typesAcc -= 1
        keepGoing = characters[newIndex].hp <= 0 && typesAcc >= 0
    } while (keepGoing)

    if (characters[newIndex].hp <= 0) {
        throw new Error(
            'All characters are dead.' +
                'Call getStatusCombat() to check combat status before invoking this function.'
        )
    }

    return newIndex
}

export default getNextCharacterIndex
