import { describe, it, expect, vi } from 'vitest'

import CombatSystem from './CombatSystem'
import type { CharacterI, ActionI } from 'types'

// Mock implementation for roll function
vi.mock('./roll', () => ({
    default: vi.fn(() => 10) // Mock default export
}))

describe('CombatSystem', () => {
    describe('CombatSystem Constructor & Initialization', () => {
        it('throws error when initialized with <2 actors', () => {
            const singleActor = [createMockCharacter()]

            expect(() => new CombatSystem(singleActor)).toThrowError(
                'The actors size should be two or greater'
            )
        })
    })

    describe('CombatSystem targets() method', () => {
        const attackAction: ActionI = { id: 'attack', type: 'attack' }
        const nonAttackAction = { id: 'heal', type: 'heal' } as unknown as ActionI

        const hero1 = createMockCharacter({ id: 'hero1', team: 'heroes' })
        const hero2 = createMockCharacter({ id: 'hero2', team: 'heroes' })
        const enemy1 = createMockCharacter({ id: 'enemy1', team: 'enemies' })
        const enemy2 = createMockCharacter({
            id: 'enemy2',
            team: 'enemies',
            isAlive: false
        })

        it('returns empty array for non-attack actions', () => {
            const combat = new CombatSystem([hero1, enemy1])
            const targets = combat.targets(nonAttackAction)

            expect(targets).toEqual([])
        })
        it('only returns alive opponents for attack actions (hero attacker)', () => {
            const combat = new CombatSystem([hero1, enemy1])
            const targets = combat.targets(attackAction)

            expect(targets).toEqual([enemy1])
        })
        it('only returns alive opponents for attack actions (enemy attacker)', () => {
            const enemyFirst = createMockCharacter({
                id: 'enemy1',
                team: 'enemies',
                dexModifier: 5  // Initiative: 10 + 5 = 15
            })
            const combat = new CombatSystem([enemyFirst, hero1])
            const targets = combat.targets(attackAction)

            expect(targets).toEqual([hero1])
        })
        it('excludes dead actors and same-team members', () => {
            const combat = new CombatSystem([hero1, enemy1, enemy2])
            const targets = combat.targets(attackAction)

            expect(targets).toEqual([enemy1])
        })
        it('returns empty array when no valid targets exist', () => {
            const deadEnemy = createMockCharacter({
                id: 'dead-enemy',
                team: 'enemies',
                isAlive: false
            })
            const combat = new CombatSystem([hero1, deadEnemy])
            const targets = combat.targets(attackAction)

            expect(targets).toEqual([])
        })
        it('handles no opponents scenario', () => {
            const combat = new CombatSystem([hero1, hero2])

            const targets = combat.targets(attackAction)
            expect(targets).toEqual([])
        })
    })

    describe('CombatSystem endTurn()', () => {
        it('sorts actors by initiative (high-to-low) and breaks ties with Dex modifier', () => {
            const actors = [
                createMockCharacter({ dexModifier: 2, id: 'high-init' }), // Initiative: 10+2=12
                createMockCharacter({ dexModifier: 1, id: 'mid-init' }),  // Initiative: 10+1=11
                createMockCharacter({ dexModifier: 3, id: 'tiebreaker-1' }), // Initiative: 10+3=13
                createMockCharacter({ dexModifier: 5, id: 'tiebreaker-2' })  // Initiative: 10+5=13
            ]

            const combat = new CombatSystem(actors)
            const expectedOrder = [actors[3], actors[2], actors[0], actors[1]]

            verifyTurnOrder(combat, expectedOrder)
        })
        it('handles identical initiative and Dex modifiers', () => {
            // Set identical roll values (10) and dex modifiers (2)
            const actors = [
                createMockCharacter({ dexModifier: 2, id: 'A' }),
                createMockCharacter({ dexModifier: 2, id: 'B' })
            ]

            const combat = new CombatSystem(actors)

            verifyTurnOrder(combat, actors)
        })
        it('Basic Advancement: Cycles to next alive actor in order', () => {
            const actor1 = createMockCharacter({ id: 'hero1', dexModifier: 2 })
            const actor2 = createMockCharacter({ id: 'enemy1', team: 'enemies', dexModifier: 1 })
            const combat = new CombatSystem([actor1, actor2])

            expect(combat.currentActor.id).toBe('hero1')
            combat.endTurn()
            expect(combat.currentActor.id).toBe('enemy1')
        })
        it('Death Handling: Skips dead actors correctly', () => {
            const actor1 = createMockCharacter({ id: 'hero1', dexModifier: 3 })
            const actor2 = createMockCharacter(
                { id: 'enemy1', team: 'enemies', dexModifier: 2, isAlive: false }
            )
            const actor3 = createMockCharacter({ id: 'hero2', dexModifier: 1 })
            const combat = new CombatSystem([actor1, actor2, actor3])

            expect(combat.currentActor.id).toBe('hero1')
            combat.endTurn()
            expect(combat.currentActor.id).toBe('hero2')
        })
        it('Death Handling: Terminates loop when only one alive remains', () => {
            const actor1 = createMockCharacter({ id: 'hero1', dexModifier: 3 })
            const actor2 = createMockCharacter(
                { id: 'enemy1', team: 'enemies', dexModifier: 2, isAlive: false }
            )
            const combat = new CombatSystem([actor1, actor2])

            expect(combat.currentActor.id).toBe('hero1')
            combat.endTurn()
            expect(combat.currentActor.id).toBe('hero1')
        })
        it('Wrap-Around: Restarts from beginning after last actor', () => {
            const actor1 = createMockCharacter({ id: 'hero1', dexModifier: 3 })
            const actor2 = createMockCharacter({ id: 'enemy1', team: 'enemies', dexModifier: 2 })
            const combat = new CombatSystem([actor1, actor2])

            expect(combat.currentActor.id).toBe('hero1')
            combat.endTurn()
            expect(combat.currentActor.id).toBe('enemy1')
            combat.endTurn()
            expect(combat.currentActor.id).toBe('hero1')
        })
        it('Wrap-Around: Handles full loops with all dead actors', () => {
            const actor1 = createMockCharacter({ id: 'hero1', dexModifier: 3, isAlive: false })
            const actor2 = createMockCharacter(
                { id: 'enemy1', team: 'enemies', dexModifier: 2, isAlive: false }
            )
            const combat = new CombatSystem([actor1, actor2])

            const initialActor = combat.currentActor
            combat.endTurn()
            expect(combat.currentActor).toBe(initialActor)
        })
    })

    describe('CombatSystem.inProgress()', () => {
        const hero1 = createMockCharacter({ id: 'hero1', team: 'heroes' })
        const hero2 = createMockCharacter({ id: 'hero2', team: 'heroes' })
        const enemy1 = createMockCharacter({ id: 'enemy1', team: 'enemies' })
        const enemy2 = createMockCharacter({ id: 'enemy2', team: 'enemies' })

        it('returns true when both teams have ≥1 alive member', () => {
            const combat = new CombatSystem([hero1, enemy1])
            expect(combat.inProgress()).toBe(true)
        })

        it('returns false when all heroes are dead (enemies alive)', () => {
            const deadHero1 = { ...hero1, isAlive: false }
            const deadHero2 = { ...hero2, isAlive: false }
            const combat = new CombatSystem([deadHero1, deadHero2, enemy1])
            expect(combat.inProgress()).toBe(false)
        })

        it('returns false when all enemies are dead (heroes alive)', () => {
            const deadEnemy1 = { ...enemy1, isAlive: false }
            const deadEnemy2 = { ...enemy2, isAlive: false }
            const combat = new CombatSystem([hero1, hero2, deadEnemy1, deadEnemy2])
            expect(combat.inProgress()).toBe(false)
        })

        it('returns false when all actors are dead', () => {
            const deadHero = { ...hero1, isAlive: false }
            const deadEnemy = { ...enemy1, isAlive: false }
            const combat = new CombatSystem([deadHero, deadEnemy])
            expect(combat.inProgress()).toBe(false)
        })

        it('returns false when only heroes exist (no enemies)', () => {
            const combat = new CombatSystem([hero1, hero2])
            expect(combat.inProgress()).toBe(false)
        })

        it('returns false when only enemies exist (no heroes)', () => {
            const combat = new CombatSystem([enemy1, enemy2])
            expect(combat.inProgress()).toBe(false)
        })
    })

    describe('Edge Cases', () => {
        it('includes dead actors in initiative order', () => {
            const alive1 = createMockCharacter({ id: 'Alive1' })
            const dead = createMockCharacter({ id: 'Dead', isAlive: false })
            const alive2 = createMockCharacter({ id: 'Alive2' })

            const actors = [alive1, dead, alive2]
            const combat = new CombatSystem(actors)

            expect(combat.currentActor).toBe(alive1)
            combat.endTurn()

            expect(combat.currentActor).toBe(alive2)
            combat.endTurn()

            expect(combat.currentActor).toBe(alive1)
        })
    })

})
// NOTE: Test helper for creating mock characters until the creation of the Character Class
const createMockCharacter = (overrides: Partial<CharacterI> = {}): CharacterI => {
    const defaults: CharacterI = {
        id: 'char-' + Math.random().toString(36).slice(2, 9),
        isAlive: true,
        team: 'heroes',
        dexModifier: 0,
        strModifier: 0,
        armorClass: 10,
        hp: 100,
        actions: [{ id: 'attack', type: 'attack' }],
        items: [{
            id: 'weapon',
            name: 'Sword',
            range: 'melee',
            dice: { count: 1, sides: 8 }
        }],
        exec: () => { }
    }

    return { ...defaults, ...overrides }
}

const verifyTurnOrder = (combat: CombatSystem, expectedOrder: CharacterI[]) => {
    for (const expectedActor of expectedOrder) {
        expect(combat.currentActor).toBe(expectedActor)
        combat.endTurn()
    }
}

