import { roll } from 'libs/systems/rollSystem'
import { validateSpecies } from 'libs/systems/validationSystem'

import { NAMES } from 'libs/data/static/character'

import type { Species } from 'libs/entities'

const randomCharacterName = (species: Species): string => {
    validateSpecies(species)
    let name = ''

    if (species === 'blazefen') {
        const { prefix, suffix } = NAMES[species]!
        const prefixPos = roll(prefix.length - 1)
        const suffixPos = roll(suffix!.length - 1)

        name = prefix[prefixPos] + suffix![suffixPos]
    }

    return name
}

export default randomCharacterName
