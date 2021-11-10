/// <reference types="cypress-xpath" />
import pageLogon from '../fixtures/userSeuBarriga.json'
import data from '../fixtures/userSeuBarrigaData.json'

describe('Teste Funcional Seu Barriga', () => {

    before(() => {
        cy.fixture('userSeuBarriga').as('pageLogon')
        cy.fixture('userSeuBarrigaData').as('data')
    });

    beforeEach(() => {
    cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type(pageLogon.email)
        cy.get(':nth-child(2) > .form-control').type(pageLogon.senha)
        cy.get('.btn').click()
        cy.get('.thead-inverse > tr > :nth-child(1)').should('contain', 'Conta')
    });
    
    afterEach(() => {
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/logout"]').click()
        cy.get('.toast-success > .toast-message').should('contain', data.logoff)
    });

    it('Inserir Conta', () => {
        //acessar contas
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()

        //preencher conta
        cy.get('.form-control').type(data.contaInserida)
        cy.get('.btn').click()
        
        //assertion conta
        cy.get('.toast-message').should('contain', data.contaMsgSucesso)
    });

    it('Alterar Conta', () => {
        //acessar contas
        cy.xpath("//li/a[@data-test='menu-settings']").click()
        cy.get('[href="/contas"]').click()

        //localizar a conta
        cy.xpath("//table//td[contains(.,'"+data.contaInserida+"')]/following-sibling::td/i[1]").click()

        //alterar a conta
        cy.get('.form-control').clear().type(data.contaAlterada)
        cy.get('.btn').click()
        
        //assertions conta
        cy.get('.toast-message').should('contain', data.contaMsgAlterada)
        cy.xpath("//table//td[contains(.,'- Alterada')]").should('have.text', data.contaAlterada)
    });

    it('Inserir Conta Repetida', () => {
        //acessar contas
        cy.xpath("//li/a[@data-test='menu-settings']").click()
        cy.get('[href="/contas"]').click()

        //informanda conta repetida
        cy.get('.form-control').clear().type(data.contaAlterada)
        cy.get('.btn').click()
        
        //assertions conta
        cy.get('.toast-message').should('contain', data.contaMsgRepetida)
        cy.xpath("//table//td[contains(.,'- Alterada')]").should('have.text', data.contaAlterada)
    });

    it('Inserir Movimentacao Conta Cypress', () => {
        //acessar movimentacao
        cy.get(':nth-child(2) > .nav-link > .fas').click()

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
        cy.get('#descricao').type(data.movDescricaoPgto)
        cy.get('.col-4 > .form-control').type(data.moviValorInserido)
        cy.get('#envolvido').type("Alunos do curso de Cypress")
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').select(data.contaAlterada)

        cy.get('.col-2 > .btn').click()
        cy.get('.btn-primary').click()
        
        //assertions na msg da Movimentacao
        cy.get('.toast-message').should('contain', data.moviMsgSucesso)
        
        //validando na pagina inicial a Conta e Valor inseridos
        cy.get(':nth-child(1) > .nav-link > .fas').click()
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
        cy.get(':nth-child(2) > .nav-link > .fas').click()

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
        cy.get('.btn-secondary').click()
        cy.get('#descricao').type(data.movDescricaoBaixaPgto)
        cy.get('.col-4 > .form-control').type(data.moviValorInseridoBaixa)
        cy.get('#envolvido').type("Alunos do curso de Cypress")
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').select(data.contaAlterada)

        cy.get('.col-2 > .btn').click()
        cy.get('.btn-primary').click()
        
        //assertions na msg da Movimentacao
        cy.get('.toast-message').should('contain', data.moviMsgSucesso)
        
        //validando na pagina inicial a Conta e Valor inseridos
        cy.get(':nth-child(1) > .nav-link > .fas').click()
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
        cy.get(':nth-child(3) > .nav-link > .fas').click()

        //localizar a movimentacao e remover
        cy.xpath("//span[contains(.,'"+data.movDescricaoBaixaPgto+"')]/../../../div/i[1]").click()
        //assertions conta
        cy.get('.toast-message').should('contain', data.moviMsgExluida)

        //localizar a movimentacao e remover
        cy.xpath("//span[contains(.,'"+data.movDescricaoPgto+"')]/../../../div/i[1]").click()
        //assertions conta
        cy.get('.toast-message').should('contain', data.moviMsgExluida)
        
        //verificando se esta zerado valor na home
        cy.get(':nth-child(1) > .nav-link > .fas').click()
        cy.xpath("//table//td[contains(.,'Total')]").should('have.text', 'Total')
        //TODO verificar!
        //cy.xpath("//table//td[contains(.,'Total')]//following-sibling::td").should('have.text', 'R$ 0,00')
        
    });   

    it('Excluir Conta Alterada', () => {
        //acessar contas
        cy.get('.dropdown-toggle').click()
        cy.get('[href="/contas"]').click()

        //localizar a conta e remover
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]/following-sibling::td/i[2]").click()

        //assertions conta
        cy.get('.toast-message').should('contain', data.contaMsgExluida)
        
        //verificando se existe a conta
        cy.xpath("//table//td[contains(.,'"+data.contaAlterada+"')]").should('not.exist', data.contaAlterada)
    });    
})