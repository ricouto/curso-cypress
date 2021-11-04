/// <reference types="cypress" />

describe('Work with alerts', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    });

    const foods = ['Carne','Frango','Pizza','Vegetariano']

    foods.forEach(food => {
        it(`Cadastro com comida '${food}'`, () => {
            cy.get('#formNome').type('Usuario123')
            cy.get('#formSobrenome').type('Qualquer sobrenome')
            cy.get('[name=formSexo][value=F').click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            //cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)')
                .should('contain', 'Cadastrado!')
        });
    })

    it.only('Deve selecionar todos usando', () => {
        cy.get('#formNome').type('Usuario123')
        cy.get('#formSobrenome').type('Qualquer sobrenome')
        cy.get('[name=formSexo][value=F').click()
        //cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
        cy.get('[name="formComidaFavorita"]').click({multiple:true})

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        //cy.get('#formCadastrar').click()
        //cy.get('#resultado > :nth-child(1)')
        //    .should('contain', 'Cadastrado!')

        cy.clickAlert('#formCadastrar','Tem certeza que voce eh vegetariano?')
    });


    it.only('Deve selecionar todos usando o Each', () => {
        cy.get('#formNome').type('Usuario123')
        cy.get('#formSobrenome').type('Qualquer sobrenome')
        cy.get('[name=formSexo][value=F').click()
        //cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
        //cy.get('[name="formComidaFavorita"]').click({multiple:true})

        cy.get('[name="formComidaFavorita"]').each($el =>{
            if($el.val() != 'vegetariano')
            cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)')
            .should('contain', 'Cadastrado!')

    });    
})