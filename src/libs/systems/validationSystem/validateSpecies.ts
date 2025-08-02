import type { Species } from 'libs/entities'

const VALID_SPECIES: Species[] = ['blazefen', 'human']

const validateSpecies = (species: Species) => {
    if (!VALID_SPECIES.includes(species)) {
        throw new Error(`Invalid species: '${species}'.`)
    }
}

export default validateSpecies

