import { IDCounters } from 'game/systems/IDSystem'

import type { IDKey } from 'game/types'

const validateID = (ID: string) => {
    const [key, value] = ID.split('_') as [IDKey, number]

    if (!(key in IDCounters) || value > IDCounters[key]) {
        throw new Error(`ID not found: ${ID}`)
    }
}

export default validateID
