const stages = {
    0: {
        nome: 'saudacao',
        especificacao: require("./stages/0")
    },
    1: {
        nome: 'nome',
        especificacao: require("./stages/1.js")
    },
    2: {
        nome: 'confirmacao_nome',
        especificacao: require("./stages/2")
    },
    3: {
        nome: 'estado',
        especificacao: require("./stages/3")
    },
    4: {
        nome: 'confirmacao_estado',
        especificacao: require("./stages/4")
    },
    5: {
        nome: 'cidade',
        especificacao: require("./stages/5")
    },
    6: {
        nome: 'confirmacao_cidade',
        especificacao: require("./stages/6")
    },
    7: {
        nome: 'acampamento/setor',
        especificacao: require("./stages/7")
    },
    8: {
        nome: 'confirmacao_acampamento/setor',
        especificacao: require("./stages/8")
    },
    9: {
        nome: 'email',
        especificacao: require("./stages/9")
    },
    10: {
        nome: 'confirmacao_email',
        especificacao: require("./stages/10")
    },
    11: {
        nome: 'despedida',
        especificacao: require("./stages/11")
    },

    waiting: false
}

module.exports = stages
// exports.step = stages