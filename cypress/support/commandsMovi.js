import loc from './locators'

Cypress.Commands.add('preencherMovimentacao', (descricao,valor,envolvido,conta) => {
    //preenchendo o form da Movimentacao
    cy.get(loc.MOVIMENTACAO.TXTDESC).type(descricao)
    cy.get(loc.MOVIMENTACAO.TXTVALOR).type(valor)
    cy.get(loc.MOVIMENTACAO.TXTENVOLVIDO).type(envolvido)
    cy.get(loc.MOVIMENTACAO.COMBO_CONTA).select(conta)
})

Cypress.Commands.add('btnSucessoSalvarMovimentacao', () =>{
    //botao sucesso e salver
    cy.get(loc.MOVIMENTACAO.BTN_SUCESSO).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOV).click()
})