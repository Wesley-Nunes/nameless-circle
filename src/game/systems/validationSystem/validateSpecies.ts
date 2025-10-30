import { VALID_SPECIES } from 'game/data/static/character'

import type { Species } from 'game/types'

const validateSpecies = (species: Species) => {
    if (!VALID_SPECIES.includes(species)) {
        throw new Error(`Invalid species: '${species}'.`)
    }
}

export default validateSpecies
