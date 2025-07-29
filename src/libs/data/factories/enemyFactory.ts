import { calculateEnemyHp } from 'libs/systems/hpSystem'
import { generateID } from 'libs/systems/IDSystem'

import type { AbilityBlock, Enemy } from 'libs/entities'

const BASE_ARMOR_CLASS = 10

const createEnemy = (
    abilityBlock: AbilityBlock,
    baseEnemy: Enemy,
    xpChallenge: number,
    name?: string,
): Enemy => {
    const enemy = structuredClone(baseEnemy)

    enemy.id = generateID(enemy.race)
    enemy.ability = abilityBlock
    enemy.armorClass = BASE_ARMOR_CLASS + enemy.ability.dex.modifier
    enemy.hp = calculateEnemyHp(xpChallenge, enemy.size, enemy.ability.con.modifier).randomHp
    enemy.isAlive = true
    enemy.xp = xpChallenge
    enemy.name = name || enemy.name

    return enemy
}

export default createEnemy







