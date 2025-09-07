const validateIDValue = (IDCounterValue: number, value: number) => {
    if (value - 1 > IDCounterValue) {
        throw new Error(
            'The value should be continuous.' +
                ` Last value register was: ${IDCounterValue}`
        )
    }
}

export default validateIDValue
