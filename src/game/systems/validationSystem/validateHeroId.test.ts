import { describe, expect, it } from 'vitest'
import validateHeroId from './validateHeroId'

describe('validateHeroId', () => {
    it('does not throw when newId exists in availableIds', () => {
        const availableIds = ['hero_0001', 'hero_0002', 'hero_0003']
        const validId = 'hero_0002'

        expect(() => validateHeroId(availableIds, validId)).not.toThrow()
    })
    it('throws error with available IDs when newId is missing in non-empty availableIds', () => {
        const availableIds = ['hero_0001', 'hero_0003']
        const invalidId = 'hero_0002'

        expect(() => validateHeroId(availableIds, invalidId)).toThrowError(
            `Invalid (ID: ${invalidId}). Available IDs: hero_0001, hero_0003`
        )
    })

    it('throws error showing empty available IDs list when availableIds is empty array', () => {
        const availableIds: string[] = []
        const invalidId = 'hero_0001'

        expect(() => validateHeroId(availableIds, invalidId)).toThrowError(
            `Invalid (ID: ${invalidId}). Available IDs: `
        )
    })
    it('throws specific error when availableIds is falsy', () => {
        const availableIds = undefined
        const invalidId = 'hero_0001'

        // @ts-expect-error - undefined Id
        expect(() => validateHeroId(availableIds, invalidId)).toThrowError(
            `Invalid (ID: ${invalidId}). No heroes are currently available.`
        )
    })
})
