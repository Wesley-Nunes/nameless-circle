import type { Combatant, CombatStatus, WinCondition } from 'libs/entities'

const generateCombatResultPoints = (
    combatants: Combatant[],
    combatStatus: CombatStatus,
    winCondition: WinCondition
) => {
    let points = 0

    if (combatStatus === 'DEFEAT') {
        points--
        return points
    }

    if (combatStatus === 'VICTORY') {
        for (const _conditions of winCondition) {
            const { quantity, ...conditions } = _conditions

            const count = combatants.filter(combatant => {
                const result = Object.keys(conditions).every(key => {
                    const combatantKey = key as keyof Combatant

                    return (
                        Object.hasOwn(combatant, key) &&
                        conditions[combatantKey] === combatant[combatantKey]
                    )
                })

                return result
            }).length

            if (count === quantity) {
                points++
            } else {
                return points
            }
        }

        return points
    }

    throw new Error(`Unhandled combat status: ${combatStatus}`)
}

export default generateCombatResultPoints
