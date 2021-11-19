// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) =>{
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.eq(message)
    })
})

Cypress.Commands.add('login', (login, password) => {
    cy.visit('https://barrigareact.wcaquino.me/')
        cy.get(loc.LOGIN.USER).type(login)
        cy.get(loc.LOGIN.PASSWORD).type(password)
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        cy.xpath(loc.HOME.TXTCONTA).should('contain', 'Conta')
})

Cypress.Commands.add('logoff', (message) => {
    cy.xpath(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.SAIR).click()
        cy.xpath(loc.MESSAGE).should('contain', message)
})

Cypress.Commands.add('getToken', (user, password) =>{
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body:{
            email: user,
            redirecionar: false,
            senha: password
        }
    })
    .its('body.token').should('not.be.empty')
    //.then(res => console.log(res))
    .then(token => {
        return token
    })
})