import type { Enemy, Hero } from 'libs/entities'

const getNextCharacterIndex = (
    characters: (Hero | Enemy)[],
    currentIndex: number
): number => {
    let newIndex = 0
    let keepGoing
    let entitiesAcc = characters.length - 1

    do {
        newIndex = (newIndex + (currentIndex + 1)) % characters.length

        entitiesAcc -= 1
        keepGoing = characters[newIndex].hp <= 0 && entitiesAcc > 0
        console.log({ newIndex, entitiesAcc, keepGoing })
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

