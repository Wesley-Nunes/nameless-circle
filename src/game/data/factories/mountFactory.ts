import { validateID } from 'game/systems/validationSystem'
import { generateID } from 'game/systems/IDSystem'

import { getHeroById, getMountByName } from 'game/data/accessors'

import type { Mount, Team } from 'game/types'

const createMount = (
    mountName: string,
    ownerId: string,
    ownerTeam: Team
): Mount => {
    validateID(ownerId)

    const mount = structuredClone(getMountByName(mountName))

    mount.availability = 'READY'
    mount.id = generateID(mount.species)
    mount.isTamedMount = true
    mount.name = `${getHeroById(ownerId).name}'s ${mountName}`
    mount.ownerId = ownerId
    mount.team = ownerTeam

    return mount
}

export default createMount
