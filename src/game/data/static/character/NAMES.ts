import type { Species } from 'game/types'

const NAMES: Record<Species, { prefix: string[]; suffix?: string[] } | null> = {
    blazefen: {
        prefix: [
            'Sizz',
            'Zizz',
            'Crack',
            'Krack',
            'Hiss',
            'Iss',
            'Ember',
            'Emb',
            'Pyre',
            'Pyr',
            'Blaze',
            'Bla',
            'Fizz',
            'Glow',
            'Glo',
            'Ves',
            'Vess',
            'Ash',
            'Smok',
            'Smog',
            'Spark'
        ],
        suffix: [
            'bog',
            'murk',
            'mirk',
            'fez',
            'ven',
            'sludge',
            'sludg',
            'well',
            'vell',
            'pool',
            'pol',
            'ooze',
            'uz',
            'thar',
            'dar',
            'ix',
            'yx',
            'mire',
            'mir',
            'kel',
            'gel',
            'lurk'
        ]
    },
    human: { prefix: ['TBD'] },
    equine: null
}

export default NAMES
