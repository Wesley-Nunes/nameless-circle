import { DeviceType } from '../../support/commands'

describe('Core flow: new game', () => {
    const devices: DeviceType[] = ['mobile', 'tablet', 'desktop']

    devices.forEach(device => {
        it(`should create a new game - ${device}`, () => {
            cy.setDevice(device)

            cy.visit('/welcome')

            cy.get('[data-test-id="nickname-input"]').type('Solar')
            cy.get('[data-test-id="submit"]').click()

            cy.location('pathname').should(currentPath => {
                expect(currentPath).to.eq('/game')
            })
        })
        it('should validate nickname input requirements and show appropriate errors', () => {
            cy.visit('/welcome')

            cy.get('[data-test-id="submit"]').click()
            cy.get('[data-test-id="error-message"]').should(
                'have.text',
                'Nickname is required'
            )

            cy.get('[data-test-id="nickname-input"]').type('0')
            cy.get('[data-test-id="submit"]').click()
            cy.get('[data-test-id="error-message"]').should(
                'have.text',
                'Nickname must be at least 2 characters long'
            )

            cy.get('[data-test-id="nickname-input"]').type('hero name too long')
            cy.get('[data-test-id="submit"]').click()
            cy.get('[data-test-id="error-message"]').should(
                'have.text',
                'Nickname must be less than 10 characters'
            )
        })
        // NOTE: Game testing is blocked by #16
    })
})
