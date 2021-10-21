/// <reference types="cypress" />

describe('Work with alerts', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });
    
    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            //console.log(msg)
            expect(msg).to.be.eq('Alert Simples')
        })
    });
    
    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            //console.log(msg)
            expect(msg).to.be.eq('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Confirmado')
        })
    });

    it('Deny', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Negado')
        })
    });

    it.only('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('39')
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Era 39?')
        })
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq(':D')
        })
        cy.get('#prompt').click()
    });

});
