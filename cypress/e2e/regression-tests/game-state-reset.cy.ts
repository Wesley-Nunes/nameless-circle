import { DeviceType } from '../../support/commands'

describe('Regression: game state reset', () => {
    const devices: DeviceType[] = ['mobile', 'tablet', 'desktop']

    devices.forEach(device => {
        it(`should successfully complete a game session and reset state for a new player - ${device}`, () => {
            cy.setDevice(device)

            function chooseAgain(attempts: number) {
                if (attempts <= 0) {
                    throw new Error(
                        'End game message not found after maximum attempts'
                    )
                }

                cy.location('pathname').then(currentPath => {
                    if (currentPath === '/thank-you') {
                        return
                    } else {
                        cy.get('[data-test-id="choice-0"]').click()
                        chooseAgain(--attempts)
                    }
                })
            }

            cy.visit('welcome')

            cy.get('[data-test-id="nickname-input"]').type('Solar')
            cy.get('[data-test-id="submit"]').click()
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/game')
            })

            // NOTE: Progress through the game by always selecting
            // the first available option until the game's conclusion is reached.
            chooseAgain(50)
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/thank-you')
            })

            cy.get('[data-test-id="home-page-button"]').click()
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/')
            })

            cy.get('[data-test-id="welcome-page-button"]').click()
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/welcome')
            })

            cy.get('[data-test-id="nickname-input"]').type('Moon')
            cy.get('[data-test-id="submit"]').click()
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/game')
            })
        })
    })
})
