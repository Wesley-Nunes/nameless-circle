import type { ActionI, CharacterI } from 'types'
import roll from './roll'

class CombatSystem {
    private order: { initiative: number, actor: CharacterI }[]
    private actorIndex = 0

    constructor(actors: CharacterI[]) {
        if (actors.length < 2) {
            throw new Error('The actors size should be two or greather')
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
        const currentTeam = this.currentActor.team
        const targets = [] as CharacterI[]

        this.order.forEach(({ actor }) => {
            if (action.type === 'attack' && actor.team !== currentTeam && actor.isAlive) {
                targets.push(actor)
            }
        })

        return targets
    }
    public endTurn() {
        do {
            this.actorIndex = (this.actorIndex + 1) % this.order.length
        } while (!this.currentActor.isAlive)
    }
}

export default CombatSystem

