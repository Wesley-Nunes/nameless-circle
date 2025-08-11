import { validateID } from 'libs/systems/validationSystem'
import { generateID } from 'libs/systems/IDSystem'

import { getHeroById, getMountByName } from 'libs/data/accessors'

import type { Mount, Team } from 'libs/entities'

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
