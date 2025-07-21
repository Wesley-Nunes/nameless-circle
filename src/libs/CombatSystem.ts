import type { ActionI, CharacterI } from 'types'
import roll from './roll'

class CombatSystem {
    private order: { initiative: number, actor: CharacterI }[]
    private currentActorIndex = 0
    private _currentActor = {} as CharacterI

    constructor(actors: CharacterI[]) {
        if (actors.length < 2) {
            throw new Error('The actors size should be two or greather')
        }

        this.order = actors.map(actor => {
            const initiative = roll() + actor.dexModifier
            return { initiative, actor }
        }).sort((a, b) => b.initiative - a.initiative || b.actor.dexModifier - a.actor.dexModifier)

        this.currentActor = this.currentActorIndex
    }

    public get currentActor(): CharacterI {
        return this._currentActor
    }
    private set currentActor(newIndex: number) {
        if (newIndex >= this.order.length) {
            throw new Error(`The index ${newIndex} is out of bounds.`)
        }

        this._currentActor = this.order[newIndex].actor
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
}

export default CombatSystem

