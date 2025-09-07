/// <reference types="cypress" />
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

declare global {
    namespace Cypress {
        interface Chainable {
            setDevice(deviceType: DeviceType): Chainable<JQuery<HTMLElement>>
        }
    }
}

Cypress.Commands.add('setDevice', (deviceType: DeviceType) => {
    const devices: Record<DeviceType, [number, number]> = {
        mobile: [360, 640],
        tablet: [768, 1024],
        desktop: [1280, 800]
    }

    const dimensions = devices[deviceType]

    if (dimensions) {
        cy.viewport(...dimensions)
        return cy.wrap(null)
    }

    throw new Error(`Unknown device: ${deviceType}`)
})
