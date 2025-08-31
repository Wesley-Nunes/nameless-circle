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
    })
})
