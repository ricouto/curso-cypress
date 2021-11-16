/// <reference types="cypress-xpath" />
import pageLogon from '../fixtures/userSeuBarriga.json'
import data from '../fixtures/userSeuBarrigaData.json'
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

        //localizar a conta
        cy.xpath("//table//td[contains(.,'"+data.contaInserida+"')]/following-sibling::td/i[1]").click()

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
        cy.informarNomeConta(data.contaAlterada)
        
        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgRepetida)
        cy.xpath("//table//td[contains(.,'- Alterada')]").should('have.text', data.contaAlterada)
    });

    it('Inserir Movimentacao Conta Cypress', () => {
        //acessar movimentacao
        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        //TODO pensar na formar de fazer / limpar o campo!
        /*
        function adicionaZero(numero){
            if (numero <= 9) 
                return "0" + numero;
            else
                return numero; 
        }

        let data = new Date();
        let dataFormatada = ((adicionaZero(data.getDate().toString())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());

        console.log(dataFormatada);
        cy.xpath("//input[@data-test='data-transacao']")

        cy.get(':nth-child(1) > :nth-child(2) > .form-control').clear().type(dataFormatada).debug()
        */
        //preenchendo o form da Movimentacao
        cy.preencherMovimentacao(data.movDescricaoPgto, data.moviValorInserido,
             "Alunos do curso de Cypress", data.contaAlterada)

       cy.btnSucessoSalvarMovimentacao()
        
        //assertions na msg da Movimentacao
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgSucesso)
        
        //validando na pagina inicial a Conta e Valor inseridos
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]").should('have.text', data.contaAlterada)
        //console.log(parseFloat(this.data.moviValorInserido));
        
        var recebeValorTabela = data.moviValorInserido
        var valorFormatado = recebeValorTabela.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'});
        //console.log(valorFormatado);
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]//following-sibling::td").should('have.text', valorFormatado)

    });

    it('Calculo do Saldo apos Movimentacao Conta Cypress', () => {
        //armazendo o valor da tabela antes do calculo
        //cy.get(':nth-child(1) > .nav-link > .fas').click()
        //var valorMovimentacao = cy.xpath("//table//td[contains(.,'"+this.data.contaAlterada+"')]//following-sibling::td").its(0)
        //console.log("valor : " + valorMovimentacao);

        //console.log("valor : " + valorMovimentacao2);
        //acessar movimentacao
        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        //TODO pensar na formar de fazer / limpar o campo!
        /*
        function adicionaZero(numero){
            if (numero <= 9) 
                return "0" + numero;
            else
                return numero; 
        }

        let data = new Date();
        let dataFormatada = ((adicionaZero(data.getDate().toString())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear());

        console.log(dataFormatada);
        cy.xpath("//input[@data-test='data-transacao']")

        cy.get(':nth-child(1) > :nth-child(2) > .form-control').clear().type(dataFormatada).debug()
        */
        //preenchendo o form da Movimentacao com valor para baixa
        cy.get(loc.MOVIMENTACAO.BTN_BAIXA).click()
        cy.preencherMovimentacao(data.movDescricaoBaixaPgto, data.moviValorInseridoBaixa,
            "Alunos do curso de Cypress", data.contaAlterada)

        cy.btnSucessoSalvarMovimentacao()
        
        //assertions na msg da Movimentacao
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgSucesso)
        
        //validando na pagina inicial a Conta e Valor inseridos
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]").should('have.text', data.contaAlterada)
        //console.log(parseFloat(this.data.moviValorInserido));

        //faz o calculo valor pago menos da baixa
        var resultPagamento = data.moviValorInserido - data.moviValorInseridoBaixa
        //console.log(resultPagamento.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'}));
        
        //var recebeValorJson = this.data.moviValorInseridoBaixa
        //var valorFormatado = recebeValorJson.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'});
        //console.log(valorFormatado);
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]//following-sibling::td")
        .should('have.text', resultPagamento.toLocaleString("pt-br",{style: 'currency', currency: 'BRL'}))

    });

    it('Excluir Movimentacao', () => {
        //acessar movimentacoes
        cy.get(loc.MENU.EXTRATO).click()

        //localizar a movimentacao e remover
        cy.xpath("//span[contains(.,'"+data.movDescricaoBaixaPgto+"')]/../../../div/i[1]").click()
        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgExluida)

        //localizar a movimentacao e remover
        cy.xpath("//span[contains(.,'"+data.movDescricaoPgto+"')]/../../../div/i[1]").click()
        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.moviMsgExluida)
        
        //verificando se esta zerado valor na home
        cy.xpath(loc.MENU.HOME).click()
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]").should('contain', '- Alterada')
        cy.xpath("//table//td[contains(.,'Total')]").should('have.text', 'Total')
        //TODO verificar!
        //cy.xpath("//table//td[contains(.,'Total')]//following-sibling::td").should('have.text', 'R$ 0,00')
        
    });   

    it('Excluir Conta Alterada', () => {
        //acessar contas
        cy.xpath(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        //localizar a conta e remover
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]/following-sibling::td/i[2]").click()

        //assertions conta
        cy.xpath(loc.MESSAGE).should('contain', data.contaMsgExluida)
        
        //verificando se existe a conta
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]").should('not.exist', data.contaAlterada)
    });    
})