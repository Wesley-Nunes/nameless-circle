import type { IDKey } from 'game/entities'

import { VALID_SPECIES } from 'game/data/static/character'

const validateIDKey = (IDKey: IDKey) => {
    if (IDKey === 'hero') return
    if (VALID_SPECIES.includes(IDKey)) return

    throw new Error(`Invalid key: '${IDKey}'.`)
}

export default validateIDKey
