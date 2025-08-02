import type { Species } from 'libs/entities'
import { validateSpecies } from 'libs/systems/validationSystem'

const idCounters: Record<Species, number> = {
    blazefen: 0,
    human: 0
}

const generateID = (species: Species) => {
    validateSpecies(species)

    idCounters[species]++

    const id = idCounters[species].toString(16).padStart(4, '0')

    return `${species}_${id}`
}

export default generateID
