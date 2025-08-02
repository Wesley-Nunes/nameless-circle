import { getCombat } from 'libs/data/accessors'

import type { Enemy } from 'libs/entities'

class GameStore {
    private enemyParty: Enemy[] = []

    private isEnemyKey(key: string, obj: Enemy): key is keyof Enemy {
        return key in obj;
    }

    public handleInkFunction(funcName: string, ...args: string[]) {
        switch (funcName) {
            case 'setCombat': {
                const combatId = args[0]
                // @ts-expect-error - Simple version of hero, the getCombat only uses the level property
                const combat = getCombat(combatId, [{ level: 3 }, { level: 1 }])
                this.enemyParty = combat.enemies

                break
            }
            case 'getEnemyInfo': {
                const [index, prop] = args
                const enemy = this.enemyParty[+index]

                if (enemy && this.isEnemyKey(prop, enemy)) {
                    return enemy[prop]
                }

                throw new Error(`ERROR! Check ${index}/${prop}`)
            }
        }
    }
}

export default GameStore

