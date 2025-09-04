const validatePlayerName = (name: string): void => {
    if (typeof name !== 'string') {
        throw new Error('Player name must be a string')
    }

    if (name.length < 2) {
        throw new Error('Player name must be at least 2 characters long')
    }

    if (name.length > 10) {
        throw new Error('Player name must be no more than 10 characters long')
    }
}

export default validatePlayerName
