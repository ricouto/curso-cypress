/// <reference types="cypress-xpath" />

import dayjs from 'dayjs'

describe('Teste do Backend - APIs do Seu Barriga', () => {
    let token

    before(() => {
        cy.getToken('ricardo_macedo@hotmail.com', '50102452')
            .then(tkn => {
                token = tkn
            })
    });
    
    beforeEach(() => {
        cy.resetRest(token)
    });

    it('Inserir Conta', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            body: {
                nome: 'Conta enviada pelo Rest'
            }
        })
            //.then(res2 => console.log(res2))
            .as('response')

        cy.get('@response').then(res3 => {
            expect(res3.status).to.be.eq(201)
            expect(res3.body).to.have.property('id')
            expect(res3.body).to.have.property('nome', 'Conta enviada pelo Rest')
        })
    })

    it('Alterar Conta', () => {
        cy.getContaByName(token, 'Conta para alterar')
            .then(contaID => {
                cy.request({
                    method: 'PUT',
                    url: `/contas/${contaID}`,
                    body: {
                        nome: 'Conta alterada via Rest'
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.nome').should('contain', 'Conta alterada via Rest')
    });

    it('Inserir Conta Repetida', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        })
            //.then(res2 => console.log(res2))
            .as('response')

        cy.get('@response').then(res3 => {
            console.log(res3);
            expect(res3.status).to.be.eq(400)
            //expect(res3.body).to.have.property('id')
            expect(res3.body.error).to.have.eq('Já existe uma conta com esse nome!')
        })

    });

    it('Inserir Movimentacao Conta Cypress', () => {
        cy.getContaByName(token, 'Conta para movimentacoes')
            .then(contaID => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    body: {
                        conta_id: contaID,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: "Inclusao de pgto na Conta",
                        envolvido: "Alunos do Cypress",
                        status: true,
                        tipo: "REC",
                        valor: "556.30",
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.eq', 201)
        cy.get('@response').its('body.id').should('exist')

    });

    it('Saldo apos Movimentacao Conta Cypress', () => {
        cy.request({
            url: '/saldo',
            method: 'GET'
        }).then(res => {
            //console.log(res)
            let saldoConta
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo')
                    saldoConta = c.saldo
                //console.log(saldoConta);
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            url: '/transacoes',
            method: 'GET',
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(res => {
            console.log(res.body[0]);
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                body: {
                    conta_id: res.body[0].conta_id,
                    data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                    data_transacao: dayjs().format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    status: true,
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET'
        }).then(res => {
            //console.log(res)
            let saldoConta
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo')
                    saldoConta = c.saldo
                //console.log(saldoConta);
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it('Excluir Movimentacao', () => {
        cy.request({
            url: '/transacoes',
            method: 'GET',
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(res => { 
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE'
            }).its('status').should('be.equal', 204)

        })

    });
})