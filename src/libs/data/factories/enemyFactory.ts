import { calculateEnemyHp } from 'libs/systems/hpSystem'
import { generateID } from 'libs/systems/IDSystem'

import type { AbilityBlock, Enemy } from 'libs/entities'

const BASE_ARMOR_CLASS = 10

const createEnemy = (
    baseEnemy: Enemy,
    enemyConfig: {
        abilities: AbilityBlock,
        xp: number
    } & Partial<Pick<Enemy, 'name' | 'preferredTargets'>>
): Enemy => {
    const enemy = structuredClone(baseEnemy)

    enemy.abilities = structuredClone(enemyConfig.abilities)
    enemy.xp = enemyConfig.xp

    enemy.armorClass = BASE_ARMOR_CLASS + enemy.abilities.dex.modifier
    enemy.hp = calculateEnemyHp(enemy.xp, enemy.size, enemy.abilities.con.modifier).randomHp

    enemy.id = generateID(enemy.race)
    enemy.isAlive = true

    if (enemyConfig?.name) { enemy.name = enemyConfig.name }
    if (enemyConfig?.preferredTargets) { enemy.preferredTargets = [...enemyConfig.preferredTargets] }

    return enemy
}

export default createEnemy

