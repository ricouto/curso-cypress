/// <reference types="cypress" />

describe('Work with Popup', () => {

it('Deve testar popup diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')
    cy.on('window:alert', msg => {
        expect(msg).to.be.eq('Click OK!')
    })
    cy.get('#otherButton').click()
});    

it('Deve verificar se o popup foi invocado', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.window().then(win => {
        cy.stub(win, 'open').as('winOpen')

    })
    cy.get('#buttonPopUp').click()
    cy.get('@winOpen').should('be.called')
    /*
    cy.get('#frame1').then(iframe => {
        
        const body = iframe.contents().find('body')
        cy.wrap(body).find('#tfield')
            .type('input texto!!!')
            .should('have.value', 'input texto!!!')
    })*/

});

describe.only('With links', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    it('Check popup URL', () => {
        cy.contains('Popup2')
        .should('have.prop', 'href')
        .and('equal', 'https://wcaquino.me/cypress/frame.html')
    });

    it('Should access popup dinamically', () => {
        cy.contains('Popup2').then($a =>{
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('Escreveu na popup!!!')
        })
        
    });

    it('Should force link on same page', () => {
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#tfield').type('Escreveu novamente!!!')
    });
    
});


})


