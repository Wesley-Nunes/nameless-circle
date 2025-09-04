import { createEnemy } from 'game/data/factories'
import {
    getEnemyAbilities,
    getEnemyAbilityPoints
} from 'game/systems/abilitySystem'
import { getEnemyXp } from 'game/systems/xpSystem'

import {
    BLAZEFEN_BASE,
    COMMONER_BASE,
    ENEMY_ROLE_TEMPLATES
} from 'game/data/static/enemies'

import type { Combat, CombatTemplate, Difficulty, Hero } from 'game/entities'

const COMBAT_MAP: Record<string, CombatTemplate> = {
    blazefen_ambush_01: {
        id: 'blazefen_ambush_01',
        enemies: (heroLevels, difficulty) => {
            const partySize = 4
            const partyXp = getEnemyXp(heroLevels, partySize, difficulty)
            const party = partyXp.map(xp => {
                const points = getEnemyAbilityPoints(xp) - 10
                const abilities = getEnemyAbilities(
                    ENEMY_ROLE_TEMPLATES['sharpshooter'],
                    points
                )

                return createEnemy(BLAZEFEN_BASE, {
                    abilities,
                    preferredTargets: ['beast'],
                    xp
                })
            })

            return party
        },
        winConditions: [
            { quantity: 4, team: 'enemies', isAlive: false },
            { quantity: 1, team: 'heroes', isTamedMount: true, isAlive: true },
            { quantity: 2, team: 'heroes', isTamedMount: true, isAlive: true }
        ]
    },
    // NOTE: Tests combats below:
    test_combat_01: {
        id: 'test_combat_01',
        // NOTE: CR 0 / XP 10 single balanced enemy
        enemies: () => {
            const xp = 10
            const points = getEnemyAbilityPoints(xp)
            const abilities = getEnemyAbilities(
                ENEMY_ROLE_TEMPLATES['balanced'],
                points
            )

            return [createEnemy(COMMONER_BASE, { abilities, xp })]
        },
        winConditions: [{ quantity: 1, team: 'enemies', isAlive: false }]
    }
}

const getCombat = (
    combatId: string,
    heroParty: Hero[],
    difficulty: Difficulty = 'moderate'
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
