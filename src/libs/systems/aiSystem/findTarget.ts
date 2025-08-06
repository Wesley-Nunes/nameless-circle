import type { Enemy, Hero } from 'libs/entities'

const findTarget = (
    aiCharacter: (Hero | Enemy),
    party: (Hero | Enemy)[]
): (Hero | Enemy) => {
    if (aiCharacter.team === 'heroes') {
        const enemiesAlive = party.filter(character => (
            character.team === 'enemies' &&
            character.hp > 0
        ))
        let weakestAlive = enemiesAlive[0]

        for (const char of enemiesAlive) {
            if (!weakestAlive || char.hp < weakestAlive.hp) {
                weakestAlive = char
            }
        }

        return weakestAlive
    }

    if (aiCharacter.team === 'enemies') {
        const enemiesAlive = party.filter(character => (
            character.team === 'heroes' &&
            character.hp > 0
        ))
        let strongestAlive = enemiesAlive[0]

        for (const char of enemiesAlive) {
            if (!strongestAlive || char.hp > strongestAlive.hp) {
                strongestAlive = char
            }
        }

        return strongestAlive
    }

    throw new Error('Team not found')
}

export default findTarget

