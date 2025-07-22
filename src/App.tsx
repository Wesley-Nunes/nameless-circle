import React, { useEffect, useState } from 'react'
import { CombatSystem } from 'libs'
import type { ActionI, CharacterI, ItemI } from 'types'
import roll from 'libs/roll'

const App: React.FC = () => {
    const exec = (action: ActionI, item: ItemI, target: CharacterI) => {
        // NOTE: Fake Character
        const character = target.team === 'heroes' ? characters[1] : characters[0]

        console.log(`Char ${character.team} attacks Char ${target.team}`)
        if (action.type === 'attack') {
            const modifier = item.range === 'melee' ? character.strModifier : character.dexModifier
            const attack = roll() + modifier
            const hitAC = attack >= target.armorClass
            if (hitAC) {
                let damage = item.dice.modifier || 0
                for (let i = 0; i < item.dice.count; i += 1) {
                    damage += roll(item.dice.sides)
                }
                target.hp -= damage

                if (target.hp <= 0) {
                    target.isAlive = false
                }
                console.log(`giving ${damage} of damage`)
            } else {
                console.log('missing')
            }

        }
    }
    const actions: ActionI[] = [
        { id: 'action_01', type: 'attack' },
    ]
    const items: ItemI[] = [
        { id: 'item_01', name: 'longsword', range: 'melee', dice: { count: 1, sides: 8 } },
        { id: 'item_02', name: 'spear', range: 'ranged', dice: { count: 1, sides: 6 } },
    ]
    const [characters, setCharacters] = useState<CharacterI[]>([
        {
            id: 'char_01',
            isAlive: true,
            team: 'heroes',
            dexModifier: 2,
            strModifier: 0,
            armorClass: 14,
            actions,
            hp: 20,
            items: [items[0]],
            exec
        },
        {
            id: 'char_02',
            isAlive: true,
            team: 'enemies',
            strModifier: 0,
            dexModifier: 4,
            armorClass: 12,
            actions,
            hp: 20,
            items: [items[1]],
            exec
        }
    ])

    useEffect(() => {
        const combat = new CombatSystem(characters)

        while (combat.inProgress()) {
            const actor = combat.currentActor
            // NOTE: The selection of action, item, and target will be done by:
            // 1. UI for player
            // 2. AI handler for npc/enemies
            const action = actor.actions[0]
            const item = actor.items[0]
            const targets = combat.targets(action)
            actor.exec(action, item, targets[0])
            combat.endTurn()
            // TEMP: 
            setCharacters([actor, ...targets])
        }
        if (!combat.inProgress()) {
            console.log(characters)
        }
    }, [characters])

    return <h1>Nameless Circle</h1>
}

export default App

