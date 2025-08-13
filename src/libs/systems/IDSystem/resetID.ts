import IDCounters from './IDCounters'

import type { IDKey } from 'libs/entities'

const resetID = () =>
    (Object.keys(IDCounters) as Array<IDKey>).forEach(key => {
        IDCounters[key] = 0
    })

export default resetID
