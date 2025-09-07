import { validateIDKey, validateIDValue } from 'game/systems/validationSystem'
import IDCounters from './IDCounters'

import type { IDKey } from 'game/types'

const addID = (ID: string) => {
    const [key, value] = ID.split('_') as [IDKey, number]

    validateIDKey(key)
    validateIDValue(IDCounters[key], Number(value))

    IDCounters[key] =
        IDCounters[key] + 1 === Number(value)
            ? Number(value)
            : IDCounters[key as IDKey]
}

export default addID
