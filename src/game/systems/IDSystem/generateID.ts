import { validateIDKey } from 'game/systems/validationSystem'

import IDCounters from './IDCounters'

import type { IDKey } from 'game/types'

const generateID = (IDKey: IDKey) => {
    validateIDKey(IDKey)

    IDCounters[IDKey]++

    const ID = IDCounters[IDKey].toString(16).padStart(4, '0')

    return `${IDKey}_${ID}`
}

export default generateID
