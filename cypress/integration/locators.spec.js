/// <reference types="cypress" />

describe('Work with basic elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    beforeEach(() =>{
        cy.reload()
    })

    it('Using jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(5) > table > tbody > tr > td > [type="radio"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get("[onclick*='Francisco']")
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    });

    it.only('Using xpath', () => {
        cy.xpath('//input')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]")
        cy.xpath("//td[contains(.,'Usuario A')]//following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").type('Funcionou....')
        
    });

})