import type { Enemy, Hero, Mount } from 'libs/entities'

const findTarget = (
    aiCharacter: (Hero | Enemy),
    party: (Hero | Enemy | Mount)[]
): (Hero | Enemy | Mount) => {
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
        const heroesAlive = party.filter(character => (
            character.team === 'heroes' &&
            character.hp > 0
        ))
        const targets = heroesAlive.filter(hero =>
            aiCharacter.preferredTargets?.some(target => hero.type.includes(target))
        )
        const endTargets = targets.length > 0 ? targets : heroesAlive

        let strongestAlive = endTargets[0]

        for (const char of endTargets) {
            if (!strongestAlive || char.hp > strongestAlive.hp) {
                strongestAlive = char
            }
        }

        return strongestAlive
    }

    throw new Error('Team not found')
}

export default findTarget

