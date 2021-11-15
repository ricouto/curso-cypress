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
        HOME: "//a[@data-test='menu-home']",
        EXTRATO: ':nth-child(3) > .nav-link > .fas'
    },

    HOME:{
        TXTCONTA: "//table//th[contains(.,'Conta')]"
    },

    CONTA:{
        NOMECONTA: '.form-control',
        BTN_CONTA: '.btn'
    },

    MOVIMENTACAO:{
        BTN_MOV: ':nth-child(2) > .nav-link > .fas',
        TXTDESC: '#descricao',
        TXTVALOR: '.col-4 > .form-control',
        TXTENVOLVIDO: '#envolvido',
        COMBO_CONTA: ':nth-child(3) > :nth-child(2) > .form-control',
        BTN_BAIXA: '.btn-secondary',
        BTN_SUCESSO: '.col-2 > .btn',
        BTN_SALVAR_MOV: '.btn-primary'
    },

    MESSAGE: "//div[@class='toast-message']"
}

export default locators;