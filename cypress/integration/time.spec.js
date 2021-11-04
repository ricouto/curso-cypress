/// <reference types="cypress" />

describe('Work with timer and tick', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    it('Going back to the past', () => {
        /*
        cy.get('#buttonNow').click()
        cy.get('#resultado > span')
            .should('contain', '04/11/2021')
        */    
        /*
        cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado > span')
            .should('contain', '31/12/1969')
        */
        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span')
            .should('contain', '10/04/2012')
    });

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .should('contain', '16360')
        //cy.get('#resultado > span').invoke('text').should('be.gt', '1334082230000')
        
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16360')
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gt', 1636031081363)
        })
        
        cy.wait(1000)
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 1000)
        })
        
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text')
        .then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 5000)
        })

        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text')
        .then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 10000)
        })
        
    });
})