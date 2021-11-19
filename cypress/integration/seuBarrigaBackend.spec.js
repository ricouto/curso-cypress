/// <reference types="cypress-xpath" />

describe('Teste do Backend - APIs do Seu Barriga', () => {
    let token

    beforeEach(() => {
    cy.getToken('ricardo_macedo@hotmail.com','50102452')
        .then(tkn => {
        token = tkn
        })
    });
    
    afterEach(() => {
        //cy.logoff(data.logoff)
    });

    it('Inserir Conta', () => {
    cy.request({
        method: 'POST',
        url:'https://barrigarest.wcaquino.me/contas',
        headers: {
            Authorization: `JWT ${token}`
        },
        body:{
            nome: 'Conta enviada pelo Rest'
        }
    })
    //.then(res2 => console.log(res2))
    .as('response')
        
    cy.get('@response').then(res3 =>{
        expect(res3.status).to.be.eq(201)
        expect(res3.body).to.have.property('id')
        expect(res3.body).to.have.property('nome', 'Conta enviada pelo Rest')
        })
    })

    it('Alterar Conta', () => {

    });

    it('Inserir Conta Repetida', () => {

    });

    it('Inserir Movimentacao Conta Cypress', () => {

    });

    it('Calculo do Saldo apos Movimentacao Conta Cypress', () => {

    });

    it('Excluir Movimentacao', () => {

    });   

    it('Excluir Conta Alterada', () => {

    });    
})