const validateHeroId = (availableIds: string[], newId: string) => {
    if (!availableIds?.includes(newId)) {
        if (!availableIds) {
            throw new Error(
                `Invalid (ID: ${newId}). No heroes are currently available.`
            )
        } else {
            throw new Error(
                `Invalid (ID: ${newId}). Available IDs: ${availableIds.join(', ')}`
            )
        }
    }
}

export default validateHeroId
