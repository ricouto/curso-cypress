
import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
    //acessar contas
    cy.xpath(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()    
})

Cypress.Commands.add('informarNomeConta', (nomeConta) => {
    //preencher conta ou alterar a conta
    cy.get(loc.CONTA.NOMECONTA).clear().type(nomeConta)
    cy.get(loc.CONTA.BTN_CONTA).click()
})