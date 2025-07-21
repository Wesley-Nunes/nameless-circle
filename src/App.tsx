import React, { useEffect, useState } from 'react'
import { CombatSystem } from 'libs'
import type { ActionI, CharacterI, ItemI } from 'types'
import roll from 'libs/roll'

const App: React.FC = () => {
    // The actions should be filtered based on **conditions**, 
    // for example, if the character doesn't have any potions, 
    // the option drink should no be displayed
    const exec = (action: ActionI, item: ItemI, target: CharacterI) => {
        // NOTE: Fake Character
        const character = target.team === 'heroes' ? characters[1] : characters[0]
        console.log(character)

        if (action.type === 'attack') {
            console.log(action)
            console.log(item)
            console.log(target)

            const modifier = item.range === 'melee' ? character.strModifier : character.dexModifier
            const attack = roll() + modifier
            const hitAC = attack >= target.armorClass
            console.log({ modifier, attack, hitAC })
            if (hitAC) {
                let damage = item.dice.modifier || 0
                for (let i = 0; i < item.dice.count; i += 1) {
                    damage += roll(item.dice.sides)
                }
                target.hp -= damage
                console.log({ damage })
            }
            console.log(target)
        }
    }
    const actions: ActionI[] = [
        { id: 'action_01', type: 'attack' },
    ]
    const items: ItemI[] = [
        { id: 'item_01', name: 'longsword', range: 'melee', dice: { count: 1, sides: 8 } },
        { id: 'item_02', name: 'spear', range: 'ranged', dice: { count: 1, sides: 6 } },
    ]
    const [characters, setCharacters] = useState<CharacterI[]>(
        [
            {
                id: 'char_01',
                isAlive: true,
                team: 'heroes',
                dexModifier: 2,
                strModifier: 1,
                armorClass: 15,
                actions,
                hp: 20,
                items: [items[0]],
                exec
            },
            {
                id: 'char_02',
                isAlive: true,
                team: 'enemies',
                strModifier: 2,
                dexModifier: -1,
                armorClass: 12,
                actions,
                hp: 20,
                items: [items[1]],
                exec
            }
        ]
    )

    useEffect(() => {
        const combat = new CombatSystem(characters)
        const actor = combat.currentActor
        // NOTE: The selection of action, item, and target will be done by:
        // 1. UI for player
        // 2. AI handler for npc/enemies
        const action = actor.actions[0]
        const item = actor.items[0]
        const targets = combat.targets(action)
        actor.exec(action, item, targets[0])
        setCharacters([actor, ...targets])
    }, [])

    useEffect(() => {
        console.log(characters)
    }, [characters])

    return <h1>Nameless Circle</h1>
}

export default App

