import type { Combatant } from 'game/types'

const findTarget = (aiCharacter: Combatant, party: Combatant[]): Combatant => {
    if (aiCharacter.team === 'heroes') {
        const enemiesAlive = party.filter(
            character => character.team === 'enemies' && character.hp > 0
        )
        let lowestHpEnemy = enemiesAlive[0]

        for (const char of enemiesAlive) {
            if (!lowestHpEnemy || char.hp < lowestHpEnemy.hp) {
                lowestHpEnemy = char
            }
        }

        return lowestHpEnemy
    }

    if (aiCharacter.team === 'enemies') {
        const heroesAlive = party.filter(
            character => character.team === 'heroes' && character.hp > 0
        )
        const targets = heroesAlive.filter(hero => {
            if ('preferredTargets' in aiCharacter) {
                return aiCharacter.preferredTargets?.some(target =>
                    hero.type.includes(target)
                )
            }
        })
        const endTargets = targets.length > 0 ? targets : heroesAlive

        let highestHpHeroAlive = endTargets[0]

        for (const char of endTargets) {
            if (!highestHpHeroAlive || char.hp > highestHpHeroAlive.hp) {
                highestHpHeroAlive = char
            }
        }

        return highestHpHeroAlive
    }

    throw new Error('Team not found')
}

export default findTarget
