const stages = {
    0: {
        descricao: 'saudacao',
        obj: require("./stages/0")
    },
    1: {
        descricao: 'nome',
        obj: require("./stages/1")
    },
    2: {
        descricao: 'confirmacao_nome',
        obj: require("./stages/2")
    },
    3: {
        descricao: 'estado',
        obj: require("./stages/3")
    },
    4: {
        descricao: 'confirmacao_estado',
        obj: require("./stages/4")
    },
    5: {
        descricao: 'cidade',
        obj: require("./stages/5")
    },
    6: {
        descricao: 'confirmacao_cidade',
        obj: require("./stages/6")
    },
    7: {
        descricao: 'acampamento/setor',
        obj: require("./stages/7")
    },
    8: {
        descricao: 'confirmacao_acampamento/setor',
        obj: require("./stages/8")
    },
    9: {
        descricao: 'email',
        obj: require("./stages/9")
    },
    10: {
        descricao: 'confirmacao_email',
        obj: require("./stages/10")
    },
    11: {
        descricao: 'despedida',
        obj: require("./stages/11")
    }
}

exports.step = stages