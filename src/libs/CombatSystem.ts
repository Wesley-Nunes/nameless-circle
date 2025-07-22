import type { ActionI, CharacterI } from 'types'
import roll from './roll'

class CombatSystem {
    private order: { initiative: number, actor: CharacterI }[]
    private actorIndex = 0

    constructor(actors: CharacterI[]) {
        if (actors.length < 2) {
            throw new Error('The actors size should be two or greater')
        }

        this.order = actors.map(actor => {
            const initiative = roll() + actor.dexModifier
            return { initiative, actor }
        }).sort((a, b) => b.initiative - a.initiative || b.actor.dexModifier - a.actor.dexModifier)
    }

    public get currentActor(): CharacterI {
        return this.order[this.actorIndex].actor
    }
    public targets(action: ActionI): CharacterI[] {
        if (action.type !== 'attack') return []

        return this.order
            .filter(item => item.actor.team !== this.currentActor.team && item.actor.isAlive)
            .map(item => item.actor)
    }
    public endTurn() {
        const startIdx = this.actorIndex
        do {
            this.actorIndex = (this.actorIndex + 1) % this.order.length
            if (this.actorIndex === startIdx) break
        } while (!this.currentActor.isAlive)
    }
    public inProgress(): boolean {
        const isHeroesAlive = this.order.some(({ actor }) => actor.isAlive && actor.team === 'heroes')
        const isEnemiesAlive = this.order.some(({ actor }) => actor.isAlive && actor.team === 'enemies')

        return isHeroesAlive && isEnemiesAlive
    }
}

export default CombatSystem

