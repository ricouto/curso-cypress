/// <reference types="cypress" />

describe('Helpers', () => {

    it('Wrap', () => {
        const obj =  {nome: "User", idade: 20}
        expect(obj).to.have.property('nome')

        //obj.should('have.proprety', 'nome') >> assim não funciona / reconhece

        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#formNome').then($el => {
            cy.wrap($el).type('Funciona via Cypress!!!')
        })

        const promise = new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })


        cy.get('#buttonSimple').then(() => console.log('Encontrei o 1 botao'))
        //promise.then(num => console.log(num)) deixar para o Cypress gerenciar

        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o 2 botao'))  
        
    })   

    it('Its', () => {
        const obj =  {nome: "User", idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 =  {nome: "User", idade: 20, endereco: {rua: 'dos doidos'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'doidos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'doidos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    });


    it.only('Invoke', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via Invoke!!!')

        cy.get('#resultado').invoke('html', '<input type="button" value="Hacked!"/>')

    });
    
})