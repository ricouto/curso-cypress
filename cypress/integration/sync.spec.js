/// <reference types="cypress" />

describe('Esperas', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('not.exist')            
        cy.get('#novoCampo')
            .should('exist')    
        cy.get('#novoCampo')
            .type('Funcionou!')
    });

    it('Deve fazer retrys', () => {
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#novoCampo')
            .should('exist')  
            .type('Funcionou com retrys!!!')          
    });
    
    it('Uso do find', () => {
        cy.get('#buttonList')
            .click()
        
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            //.find('span') >> nao eh interessante para esta execucao
            .should('contain', 'Item 2')
    });

    it('Uso do find - botao DOM', () => {
        cy.get('#buttonListDOM')
            .click()
        
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            //.find('span') //>> nao eh interessante para esta execucao
            //motivo que fixa o span e quando busca na DOM nao estah para validacao
            .should('contain', 'Item 2')
    });

    it('Uso do timeout', () => {
        /*
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo') //, {timeout: 1000}).should('exist')
        */
        
        /*
        cy.get('#buttonListDOM')
            .click()
            //cy.wait(5000) >> deve ser evitado pois segura a aplicacao por tempo fixo
        cy.get('#lista li span', {timeout: 30000})
            //.find('span') >> nao eh interessante para esta execucao
            .should('contain', 'Item 2')            
        */

        cy.get('#buttonListDOM')
                .click()
        cy.get('#lista li span') //,{timeout: 30000} >> nao precisa do timeout pq a assertiva_
        //_ja tem o proprio
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    });
    
    it('Click retry', () => {
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', 111)
    });
    
    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM')
            .should($el =>{
            console.log($el);
            expect($el).to.have.length(1)
            //cy.get('#buttonList')
        }) //.and('eq', 2)
            //.and('not.have.id', 'buttonListDOM');
        
    });
    
});  