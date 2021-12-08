const buildEnv = () => {
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
    }).as('Contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            { "conta": "Conta para movimentacoes", "id": 904391, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2021-12-08T03:00:00.000Z", "data_pagamento": "2021-12-08T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 972154, "usuario_id": 25940, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 904392, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2021-12-08T03:00:00.000Z", "data_pagamento": "2021-12-08T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 972155, "usuario_id": 25940, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 904393, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2021-12-08T03:00:00.000Z", "data_pagamento": "2021-12-08T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 972156, "usuario_id": 25940, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 904394, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-12-08T03:00:00.000Z", "data_pagamento": "2021-12-08T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 972156, "usuario_id": 25940, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 904395, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2021-12-08T03:00:00.000Z", "data_pagamento": "2021-12-08T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 972156, "usuario_id": 25940, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para extrato", "id": 904396, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2021-12-08T03:00:00.000Z", "data_pagamento": "2021-12-08T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 972157, "usuario_id": 25940, "transferencia_id": null, "parcelamento_id": null }
        ]
    })

}

export default buildEnv