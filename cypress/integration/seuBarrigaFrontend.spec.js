///<reference types="cypress-xpath" />

import pageLogon from '../fixtures/userSeuBarriga.json'
import data from '../fixtures/userSeuBarrigaData.json'
import '../support/commands'
import loc from '../support/locators'
import '../support/commandsConta'
import '../support/commandsMovi'

describe('Teste Funcional Seu Barriga', () => {

    after(() => {
        cy.clearLocalStorage()
    });

    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 2594450,
                nome: 'usuario falso',
                token: 'uma stirng muito grande que nao deveria ser aceita mas vai'
            }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 1000,
                conta: "Carteira",
                saldo: 100.00
            },
            {
                conta_id: 1000,
                conta: "Banco",
                saldo: 10000000.00
            }]
        }).as('Saldo')
        cy.login('ricardo_macedo@hotmail.com', 'senha errada')
    });

    /*
    afterEach(() => {
        cy.logoff(data.logoff)
    });*/

    it.only('Inserir Conta', () => {
        //acessar contas
        cy.route({
            method: 'GET',
            url: '/contas',
            response:
                [
                    {
                        id: 1,
                        nome: "Carteira",
                        visivel: true,
                        usuario_id: 25940
                    },
                    {
                        id: 2,
                        nome: "Banco",
                        visivel: true,
                        usuario_id: 25940
                    }
                ]
        }).as('contas')

        cy.route({
            method: 'POST',
            url: '/contas',
            response: [
                {id:3,nome:"Conta de Teste","visivel":true,"usuario_id":25940}//,{"id":2,"nome":"Banco","visivel":true,"usuario_id":25940}]
            ]
        })
        cy.acessarMenuConta()

        //preencher conta
        cy.informarNomeConta(data.contaInserida)

        //assertion conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgSucesso)
    });

    it('Alterar Conta', () => {
        //acessar contas
        cy.acessarMenuConta()

        //localizar a conta passando o valor usando a funcao no locators
        cy.xpath(loc.CONTA.FN_XP_PESQUISA_CONTA(data.contaInserida)).click()

        //alterar a conta
        cy.informarNomeConta(data.contaAlterada)

        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgAlterada)
        cy.xpath("//table//td[contains(.,'- Alterada')]).should('contain', data.contaAlterada")
    });

    it('Inserir Conta Repetida', () => {
        //acessar contas
        cy.acessarMenuConta()

        //informanda conta repetida
        cy.informarNomeConta(data.contaAlterada)

        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgRepetida)
        cy.xpath("//table//td[contains(.,'- Alterada')]).should('have.text', data.contaAlterada")
    });

    it('Inserir Movimentacao Conta Cypress', () => {
        //acessar movimentacao
        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        //preenchendo o form da Movimentacao
        cy.preencherMovimentacao(data.movDescricaoPgto, data.moviValorInserido,
            "Alunos do curso de Cypress", data.contaAlterada)

        cy.btnSucessoSalvarMovimentacao()

        //assertions na msg da Movimentacao
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgSucesso)

        //validando na pagina inicial a Conta e Valor inseridos
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,' + data.contaAlterada + ')]).should('have.text', data.contaAlterada")
        //console.log(parseFloat(this.data.moviValorInserido));

        var recebeValorTabela = data.moviValorInserido
        var valorFormatado = recebeValorTabela.toLocaleString(pt - br, { style: 'currency', currency: 'BRL' });
        //console.log(valorFormatado);
        cy.xpath("//table//td[contains(.,' + data.contaAlterada + ')]//following-sibling::td).should('have.text', valorFormatado")
    });

    it('Calculo do Saldo apos Movimentacao Conta Cypress', () => {
        //acessar movimentacao
        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        //preenchendo o form da Movimentacao com valor para baixa
        cy.get(loc.MOVIMENTACAO.BTN_BAIXA).click()
        cy.preencherMovimentacao(data.movDescricaoBaixaPgto, data.moviValorInseridoBaixa,
            "Alunos do curso de Cypress", data.contaAlterada)

        cy.btnSucessoSalvarMovimentacao()

        //assertions na msg da Movimentacao
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgSucesso)

        //validando na pagina inicial a Conta e Valor inseridos
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,' + data.contaAlterada + ')]).should('have.text', data.contaAlterada")
        //console.log(parseFloat(this.data.moviValorInserido));

        //faz o calculo valor pago menos da baixa
        var resultPagamento = data.moviValorInserido - data.moviValorInseridoBaixa
        //console.log(resultPagamento.toLocaleString(pt-br,{style: 'currency', currency: 'BRL'}));

        //var recebeValorJson = this.data.moviValorInseridoBaixa
        //var valorFormatado = recebeValorJson.toLocaleString(pt-br,{style: 'currency', currency: 'BRL'});
        //console.log(valorFormatado);
        cy.xpath("//table//td[contains(.,' + data.contaAlterada + ')]//following-sibling::td")
            .should('have.text', resultPagamento.toLocaleString(pt - br, { style: 'currency', currency: 'BRL' }))

    });

    it('Excluir Movimentacao', () => {
        //acessar movimentacoes
        cy.get(loc.MENU.EXTRATO).click()

        //localizar a movimentacao e remover
        cy.xpath(loc.MOVIMENTACAO.FN_XP_EXCLUIR_MOV(data.movDescricaoBaixaPgto)).click()

        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgExluida)

        //localizar a movimentacao e remover
        cy.xpath(loc.MOVIMENTACAO.FN_XP_EXCLUIR_MOV(data.movDescricaoPgto)).click()

        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgExluida)

        //verificando se esta zerado valor na home
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,' + data.contaAlterada + ')]).should('contain', '- Alterada'")
        cy.xpath("//table//td[contains(.,'Total')]).should('have.text', 'Total'")
    });

    it('Excluir Conta Alterada', () => {
        //acessar contas
        cy.xpath(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        //localizar a conta e remover
        cy.xpath(loc.CONTA.FN_XP_EXCLUIR_CONTA(data.contaAlterada)).click()

        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgExluida)

        //verificando se existe a conta
        cy.xpath("//table//td[contains(.,' + data.contaAlterada + ')]).should('not.exist', data.contaAlterada")
    });
})