import type { CharacterI } from 'types'

class BattleSystem {
    private order: { initiative: number, actor: CharacterI }[]
    private currentActorIndex = 0
    private _currentActor = {} as CharacterI

    constructor(actors: CharacterI[]) {
        if (actors.length < 2) {
            throw new Error('The actors size should be two or greather')
        }

        this.order = actors.map(actor => {
            const initiative = this.roll() + actor.dexModifier
            return { initiative, actor }
        }).sort((a, b) => b.initiative - a.initiative || b.actor.dexModifier - a.actor.dexModifier)

        this.currentActor = this.currentActorIndex
    }

    private roll(dice = 20): number {
        return Math.ceil(Math.random() * dice)
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
}

export default BattleSystem

