import { VALID_SPECIES } from 'libs/data/static/character'

import type { Species } from 'libs/entities'

const validateSpecies = (species: Species) => {
    if (!VALID_SPECIES.includes(species)) {
        throw new Error(`Invalid species: '${species}'.`)
    }
}

export default validateSpecies
