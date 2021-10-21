/// <reference types="cypress" />

describe('Work with alerts', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    
    beforeEach(() => {
        cy.reload()
    });

    it('Validando Mensagens', () => {

        const stub = cy.stub().as('Alertas')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
            cy.get('#formNome').clear().type('Nome da pessoa no teste')

        cy.get('#formCadastrar').click().then(() => 
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
            cy.get('[data-cy=dataSobrenome]').clear().type('Sobrenome da pessoa no teste')
        
        cy.get('#formCadastrar').click().then(() => 
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
            cy.get('#formSexoFem').click().should('be.checked')
        
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')    
        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')  
    })

})