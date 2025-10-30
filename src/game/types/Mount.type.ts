import type { Character } from './Character.type'

type MountAvailability =
    | 'READY' // Available for immediate use
    | 'STABLED' // Secured at a location (needs retrieval)
    | 'EXHAUSTED' // Temporarily unusable (after forced march/combat)
    | 'INJURED' // Wounded but recoverable (penalties apply)
    | 'TRAINING' // Mount being tamed/leveled up
    | 'DEAD' // Permanently unavailable
    | 'LOST' // Story-driven unavailability (stolen/fled)
    | 'ACTIVE_EFFECT' // Under spell/ability influence (e.g., Calm Animals)

export type Mount = Character & {
    availability: MountAvailability
    ownerId: string
    isTamedMount: boolean
}
