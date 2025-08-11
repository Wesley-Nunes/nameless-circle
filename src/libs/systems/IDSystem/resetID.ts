import type { IDKey } from 'libs/entities'
import IDCounters from './IDCounters'

const resetID = () => {
    ;(Object.keys(IDCounters) as Array<IDKey>).forEach(key => {
        IDCounters[key] = 0
    })
}

export default resetID
