const validatePositiveNumber = (value: number, paramName: string) => {
    if (typeof value !== 'number' || value <= 0) {
        throw new Error(
            `Invalid ${paramName}: '${value}'. Must be a positive number.`
        )
    }
}

export default validatePositiveNumber
