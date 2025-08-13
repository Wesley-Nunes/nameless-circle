import type { Hero } from 'libs/entities'

const validateHeroPartySize = (heroParty: Hero[]) => {
    if (heroParty.length > 3) {
        throw new Error(
            'Maximum party size reached (3 heroes). ' +
                'Please remove a hero first using removeFromParty().'
        )
    }
}

export default validateHeroPartySize
