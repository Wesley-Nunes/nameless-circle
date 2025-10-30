import type { Character } from 'game/types'

const validatePartySize = (party: Character[]) => {
    if (party.length < 2) {
        throw new Error('The party size should be two or greater')
    }
}

export default validatePartySize
