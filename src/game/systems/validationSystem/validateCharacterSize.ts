import { CHARACTER_SIZE } from 'game/data/static/character'
import type { CharacterSize } from 'game/types'

const validateCharacterSize = (size: CharacterSize) => {
    if (typeof size !== 'string' || !CHARACTER_SIZE.includes(size)) {
        throw new Error(
            `Invalid size: '${size}'. Value must be a string from the CHARACTER_SIZE array.`
        )
    }
}

export default validateCharacterSize
