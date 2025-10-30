import type { Hero } from 'game/types'

const validateHeroPartySize = (heroParty: Hero[]) => {
    if (heroParty.length > 3) {
        throw new Error(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )
    }
}

export default validateHeroPartySize
