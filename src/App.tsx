import React, { useEffect } from 'react'
import { CombatSystem } from 'libs'
import type { ActionsI, CharacterI } from 'types'

const App: React.FC = () => {

    useEffect(() => {
        // The actions should be filtered based on **conditions**, 
        // for example, if the character doesn't have any potions, 
        // the option drink should no be displayed
        const actions: ActionsI[] = [
            { id: 'action_01', type: 'attack' },
        ]
        const items = [
            { id: 'item_01', },
            { id: 'item_02', },
        ]
        const characters: CharacterI[] = [
            { id: 'char_01', isAlive: true, team: 'heroes', dexModifier: 2, actions, items: [items[0]] },
            { id: 'char_02', isAlive: true, team: 'enemies', dexModifier: 0, actions, items: [items[1]] },
            { id: 'char_03', isAlive: true, team: 'enemies', dexModifier: -1, actions, items: [items[0]] }
        ]
        const combat = new CombatSystem(characters)
        console.log(combat.currentActor)
        console.log(combat.targets(actions[0]))
    }, [])

    return <h1>Nameless Circle</h1>
}

export default App

