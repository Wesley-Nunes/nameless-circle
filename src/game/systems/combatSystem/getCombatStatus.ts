import type { CombatStatus, Enemy, Hero, Mount } from 'game/entities'

const getCombatStatus = (
    characters?: (Hero | Enemy | Mount)[]
): CombatStatus => {
    if (!characters) {
        return 'UNINITIALIZED'
    }

    const isEnemiesDefeated = characters
        .filter(character => character.team === 'enemies')
        .every(character => character.hp <= 0)

    const isHeroesDefeated = characters
        .filter(character => character.team === 'heroes')
        .every(character => character.hp <= 0)

    if (isEnemiesDefeated) {
        return 'VICTORY'
    }

    if (isHeroesDefeated) {
        return 'DEFEAT'
    }

    return 'IN_PROGRESS'
}

export default getCombatStatus
