/// <reference types="cypress" />

describe('Work with basic elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() => {
        cy.reload()
    });

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        //cy.get('body').should('have.text', 'Cuidado') >> nao funciona!
        cy.get('span').should('contain', 'Cuidado')
        //cy.get('div').should('contain', 'Cuidado') >> nao funciona!
        //cy.get('.facilAchar').should('contain', 'Cuidado') >> deixou mais restrito a pesquisa
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        
    });

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
    });

    it('Text Fields', () => {
        //documentacao >> https://docs.cypress.io/api/commands/type#Syntax
        //campo de texto
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        //campo Text Area
        cy.get('#elementosForm\\:sugestoes')
            .type('Text Area')
            .should('have.value', 'Text Area')
        
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('?????')

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        //campo Text Area
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto',{delay: 100})
            .should('have.value', 'acerto')
        
    }); 
    
    it('Radio Button', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get('[name=formSexo]')
            .should('have.length', 2)
    });

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')
        
        cy.get('[name=formComidaFavorita]')
            .click({ multiple: true })
        
        cy.get('#formComidaPizza')
            .should('not.be.checked')
        
        cy.get('#formComidaVegetariana')
            .should('be.checked')
    });

    it('Combo Box', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
        
        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)

        cy.get('[data-test=dataEscolaridade] option').then($arr =>{
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Doutorado", "Mestrado", "Especializacao"])
        })
    });

    it.only('Combo Multipla', () => {
        cy.get('[data-testid=dataEsportes]')
        .select(['Corrida','Karate','nada','futebol'])
        
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['Corrida','Karate','nada','futebol'])
            expect($el.val()).to.have.length(4)
        })
        
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql', ['Corrida','Karate','nada','futebol'])

    });
    
});