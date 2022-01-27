const banco = require("../banco");

function execute(user, msg) {
    if (msg === 'Tá osso!') {
        var frase_nome = 'Massa! Pra começar, me manda seu nome completo, por favor'
        banco.db[user].stage = 2
    } else {
        var frase_nome = `🥺 Eu até queria conversar mas só me ensinaram a fazer cadastro

👆 Pra fazer sua incrição é só clicar no botão acima`
    }

    return [frase_nome]
}

exports.execute = execute