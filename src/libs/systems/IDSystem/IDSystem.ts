import type { Race } from 'libs/entities'
import { validateIDParam } from 'libs/systems/validationSystem'

const idCounters: Record<Race, number> = {
    blazefen: 0
}

const generateID = (race: Race) => {
    validateIDParam(race)

    idCounters[race]++

    const id = idCounters[race].toString(16).padStart(4, '0')

    return `${race}_${id}`
}

export default generateID
