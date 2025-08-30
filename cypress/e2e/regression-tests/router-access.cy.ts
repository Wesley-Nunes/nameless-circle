describe('Regression: router access', () => {
    it('should successfully access routes', () => {
        cy.visit('')

        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/')
        })

        cy.visit('welcome')
        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/welcome')
        })
    })
    it('should redirect to /welcome when trying to access /game directly', () => {
        cy.visit('game')
        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/welcome')
        })
    })
})
