import { createEnemy } from 'libs/data/factories'
import { getEnemyAbilities, getEnemyAbilityPoints } from 'libs/systems/abilitySystem'
import { getEnemyXp } from 'libs/systems/xpSystem'

import { BLAZEFEN_BASE, ENEMY_ROLE_TEMPLATES } from 'libs/data/static/enemies'

import type { Combat, CombatTemplate, Difficulty, Hero } from 'libs/entities'

const COMBAT_MAP: Record<string, CombatTemplate> = {
    blazefen_ambush_01: {
        id: 'blazefen_ambush_01',
        enemies: (heroLevels, difficulty) => {
            const partySize = 4
            const partyXp = getEnemyXp(heroLevels, partySize, difficulty)
            const party = partyXp.map((xp) => {
                const points = getEnemyAbilityPoints(xp)
                const abilities = getEnemyAbilities(ENEMY_ROLE_TEMPLATES['sharpshooter'], points)

                return createEnemy(BLAZEFEN_BASE, { abilities, preferredTargets: ['beast'], xp })
            })

            return party
        },
        winConditions: [{ basic: 'kill_all_enemies', extra: 'save_all_mounts' }]
    }
}

const getCombat = (
    combatId: string,
    heroParty: Hero[],
    difficulty: Difficulty = 'low'
): Combat => {
    const combatTemplate = COMBAT_MAP[combatId]
    if (!combatTemplate) throw new Error(`Unknown combat ID: ${combatId}`)
    const heroLevels = heroParty.map(({ level }) => level)
    const combat: Combat = {
        id: combatId,
        enemies: combatTemplate.enemies(heroLevels, difficulty),
        winConditions: combatTemplate.winConditions
    }

    return combat
}

export default getCombat

