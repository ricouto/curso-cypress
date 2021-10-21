/// <reference types="cypress" />

describe('Work with iFrame', () => {

    /*
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });
    */

it('Deve preencher campo de teste', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#frame1').then(iframe => {
        
        const body = iframe.contents().find('body')
        cy.wrap(body).find('#tfield')
            .type('input texto!!!')
            .should('have.value', 'input texto!!!')

        /*
        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Alert Simples')
        })
        //cy.wrap(body).find('#otherButton').click()
        */
    })
});

it('Deve testar frame diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')
    cy.on('window:alert', msg => {
        expect(msg).to.be.eq('Click OK!')
    })
    cy.get('#otherButton').click()
});

})