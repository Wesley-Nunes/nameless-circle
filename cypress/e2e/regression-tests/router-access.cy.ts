import { DeviceType } from '../../support/commands'

describe('Regression: router access', () => {
    const devices: DeviceType[] = ['mobile', 'tablet', 'desktop']

    devices.forEach(device => {
        it(`should successfully access routes - ${device}`, () => {
            cy.setDevice(device)

            cy.visit('')
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/')
            })

            cy.visit('welcome')
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/welcome')
            })
        })
        it(`should redirect to /welcome when trying to access /game directly - ${device}`, () => {
            cy.setDevice(device)

            cy.visit('game')
            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/welcome')
            })
        })
        it(`should redirect to /game if the game has already been initialized - ${device}`, () => {
            cy.setDevice(device)

            cy.visit('welcome')

            cy.get('[data-test-id="nickname-input"]').type('Solar')
            cy.get('[data-test-id="submit"]').click()

            cy.get('[data-test-id="choice-0"]')
                .should(
                    'have.text',
                    '“Commander, Let me join you at the Citadel.”'
                )
                .click()

            cy.get('[data-test-id="home-page-button"]').click()

            cy.get('[data-test-id="welcome-page-button"]').click()

            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/game')
            })
            cy.get('[data-test-id="choice-0"]').should(
                'not.have.text',
                '“Commander, Let me join you at the Citadel.”'
            )
        })
    })
})
