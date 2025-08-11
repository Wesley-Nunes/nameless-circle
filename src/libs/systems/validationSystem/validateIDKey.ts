import type { IDKey } from 'libs/entities'

import { VALID_SPECIES } from 'libs/data/static/character'

const validateIDKey = (IDKey: IDKey) => {
    if (IDKey === 'hero') return
    if (VALID_SPECIES.includes(IDKey)) return

    throw new Error(`Invalid key: '${IDKey}'.`)
}

export default validateIDKey
