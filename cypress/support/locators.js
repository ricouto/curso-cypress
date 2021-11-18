const locators = {
    LOGIN:{
        USER: '.input-group > .form-control',
        PASSWORD: ':nth-child(2) > .form-control',
        BTN_LOGIN: '.btn'
    },

    MENU:{
        SETTINGS: "//a[@data-test='menu-settings']",
        SAIR: '[href="/logout"]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        HOME: "//a[@data-test='menu-home']",
        EXTRATO: ':nth-child(3) > .nav-link > .fas'
    },

    HOME:{
        TXTCONTA: "//table//th[contains(.,'Conta')]"
    },

    EXTRATO:{
        LINHAS: "//div/li"
    },

    CONTA:{
        NOMECONTA: '.form-control',
        BTN_CONTA: '.btn',
        FN_XP_PESQUISA_CONTA: nomeConta => `//table//td[contains(.,'${nomeConta}')]/following-sibling::td/i[1]`,
        FN_XP_EXCLUIR_CONTA: nomeContaExcluir => `//table//td[contains(.,'${nomeContaExcluir}')]/following-sibling::td/i[2]`
    },

    MOVIMENTACAO:{
        BTN_MOV: ':nth-child(2) > .nav-link > .fas',
        TXTDESC: '#descricao',
        TXTVALOR: '.col-4 > .form-control',
        TXTENVOLVIDO: '#envolvido',
        COMBO_CONTA: ':nth-child(3) > :nth-child(2) > .form-control',
        BTN_BAIXA: '.btn-secondary',
        BTN_SUCESSO: '.col-2 > .btn',
        BTN_SALVAR_MOV: '.btn-primary',
        FN_XP_EXCLUIR_MOV: nomeMovimentacao => `//span[contains(.,'${nomeMovimentacao}')]/../../../div/i[1]`
    },

    MESSAGE: "//div[@class='toast-message']"
}

export default locators;