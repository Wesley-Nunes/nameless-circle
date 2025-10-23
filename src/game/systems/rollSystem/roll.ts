const roll = (dice = 20): number => {
    if (dice <= 0) {
        throw new Error(
            `A die must have at least 1 face, but got ${dice} faces.`
        )
    }

    return Math.ceil(Math.random() * dice)
}

export default roll
