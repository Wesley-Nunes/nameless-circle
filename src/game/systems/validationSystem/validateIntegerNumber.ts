const validateInteger = (value: number, paramName: string) => {
    if (!Number.isInteger(value)) {
        throw new Error(`Invalid ${paramName}: '${value}'. Must be an integer.`)
    }
}

export default validateInteger
