import { ridingHorse } from 'game/data/static/mounts'

import type { Mount } from 'game/entities'

const mountRegistry: Record<string, Mount> = {
    [ridingHorse.name]: ridingHorse
}

const getMountByName = (name: string): Mount => {
    const mount = mountRegistry[name]

    if (!mount) {
        throw new Error(`Mount name: ${name} not found`)
    }

    return mount
}

export default getMountByName
