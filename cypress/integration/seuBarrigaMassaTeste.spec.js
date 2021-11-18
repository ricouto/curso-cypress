/// <reference types="cypress-xpath" />
import pageLogon from '../fixtures/userSeuBarriga.json'
import data from '../fixtures/userSeuBarrigaMassaTeste.json'
import loc from '../support/locators'
import '../support/commandsConta'
import '../support/commandsMovi'

describe('Teste Funcional Seu Barriga', () => {

    beforeEach(() => {
        cy.login(pageLogon.email, pageLogon.senha)
    });
    
    afterEach(() => {
        cy.logoff(data.logoff)
    });

    before(() => {
        cy.login(pageLogon.email, pageLogon.senha)
        cy.apagarDadosGeral()
        cy.logoff(data.logoff)
    });

    after(() => {
        cy.login(pageLogon.email, pageLogon.senha)
        cy.apagarDadosGeral()
        cy.logoff(data.logoff)
    });

    it('Inserir Conta', () => {
        //acessar contas
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
        cy.xpath(loc.CONTA.FN_XP_PESQUISA_CONTA(data.contaNomeAntesAlterar)).click()

        //alterar a conta
        cy.informarNomeConta(data.contaAlterada)
        
        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgAlterada)
        cy.xpath("//table//td[contains(.,'- Alterada')]").should('contain', data.contaAlterada)
    });

    it('Inserir Conta Repetida', () => {
        //acessar contas
        cy.acessarMenuConta()

        //informanda conta repetida
        cy.informarNomeConta(data.contaRepetida)
        
        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgRepetida)
        cy.xpath("//table//td[contains(.,'"+data.contaRepetida+"')]").should('have.text', data.contaRepetida)
    });

    it('Inserir Movimentacao Conta Cypress', () => {
        //acessar movimentacao
        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        //preenchendo o form da Movimentacao
        cy.preencherMovimentacao(data.movDescricaoPgto, data.moviValorInserido,
             "Alunos do curso de Cypress", data.contaParaMovimentacao)

       cy.btnSucessoSalvarMovimentacao()
        
        //assertions na msg da Movimentacao
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgSucesso)
        
        //validando na pagina inicial a Conta e Valor inseridos
        //cy.xpath(loc.MENU.HOME).click()
        //cy.xpath("//table//td[contains(.,'"+data.contaParaMovimentacao+"')]").should('have.text', data.contaParaMovimentacao)
        //console.log(parseFloat(this.data.moviValorInserido));

        cy.get(loc.MENU.EXTRATO).click()
        
        var recebeValorTabela = data.moviValorInserido
        var valorFormatado = recebeValorTabela.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'});
        cy.xpath("//div/li//span[contains(.,'"+data.movDescricaoPgto+"')]//following-sibling::small")
            .should('contain', valorFormatado)
        //console.log(valorFormatado);
        //cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]//following-sibling::td").should('have.text', valorFormatado)
    });

    it('Calculo do Saldo apos Movimentacao Conta Cypress', () => {
        //acessar movimentacao
        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        //preenchendo o form da Movimentacao com valor para baixa
        cy.get(loc.MOVIMENTACAO.BTN_BAIXA).click()
        cy.preencherMovimentacao(data.movDescricaoBaixaPgto, data.moviValorInseridoBaixa,
            "Alunos do curso de Cypress", data.contaParaBaixa)

        cy.btnSucessoSalvarMovimentacao()
        
        //assertions na msg da Movimentacao
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgSucesso)
        
        //validando na pagina inicial a Conta e Valor inseridos
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,'"+data.contaParaBaixa+"')]").should('have.text', data.contaParaBaixa)
        //console.log(parseFloat(this.data.moviValorInserido));

        //faz o calculo valor pago menos da baixa
        var resultPagamento = data.moviValorInseridoBaixado //data.moviValorInseridoBaixa - data.moviValorInserido
        //console.log(resultPagamento.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'}));
        
        //var recebeValorJson = this.data.moviValorInseridoBaixa
        //var valorFormatado = recebeValorJson.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'});
        //console.log(valorFormatado);
        cy.xpath("//table//td[contains(.,'"+data.contaParaBaixa+"')]//following-sibling::td")
        .should('have.text', resultPagamento.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'}))

    });

    it('Excluir Movimentacao', () => {
        //acessar movimentacoes
        cy.get(loc.MENU.EXTRATO).click()

        //localizar a movimentacao e remover
        cy.xpath(loc.MOVIMENTACAO.FN_XP_EXCLUIR_MOV(data.movDescricaoBaixaPgtoMassa)).click()
        
        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgExluida)

        //localizar a movimentacao e remover
        //cy.xpath(loc.MOVIMENTACAO.FN_XP_EXCLUIR_MOV(data.movDescricaoPgto)).click()
       
        //assertions conta
        //cy.xpath(loc.MESSAGE).should('contain', data.moviMsgExluida)
        
        //verificando se esta zerado valor na home
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,'Conta')]").should('not.contain', data.contaParaExclusao)
        cy.xpath("//table//td[contains(.,'Total')]").should('have.text', 'Total')
    });     
})