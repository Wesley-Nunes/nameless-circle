import React, { useEffect } from 'react'
import { BattleSystem } from 'libs'

const App: React.FC = () => {

    useEffect(() => {
        const battle = new BattleSystem([{ dexModifier: 2 }, { dexModifier: 0 }])
        console.log(battle.currentActor)
    }, [])

    return <h1>Nameless Circle</h1>
}

export default App

