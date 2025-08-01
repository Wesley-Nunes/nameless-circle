import { getCombat } from 'libs/data/accessors'

class GameStore {
    public handleInkFunction(funcName: string, ...args: string[]) {
        switch (funcName) {
            case 'setCombat':
                const combatId = args[0]
                // @ts-expect-error - Simple version of hero, the getCombat only uses the level property
                const combat = getCombat(combatId, [{ level: 3 }, { level: 1 }])
                console.log(combat)
        }
    }
}

export default GameStore

