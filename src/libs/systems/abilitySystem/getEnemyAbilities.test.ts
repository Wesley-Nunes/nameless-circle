import { describe, it, expect } from 'vitest'
import getEnemyAbilities from './getEnemyAbilities'
import { ENEMY_ROLE_TEMPLATES } from 'libs/data/static/enemies'

describe('getEnemyAbilities ', () => {
    it('should return a high-dexterity distribution for a sharpshooter template', () => {
        const expectedAbilities = {
            str: { score: 9, modifier: -1 },
            con: { score: 9, modifier: -1 },
            dex: { score: 14, modifier: 2 },
            wis: { score: 11, modifier: 0 },
            int: { score: 9, modifier: -1 },
            cha: { score: 8, modifier: -1 }
        }

        const abilities = getEnemyAbilities(
            ENEMY_ROLE_TEMPLATES['sharpshooter'],
            60
        )

        expect(abilities).toStrictEqual(expectedAbilities)
    })
})
