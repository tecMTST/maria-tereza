const banco = require("../banco");

function execute(user, msg) {
    let confirma_nome = `Seu nome completo então é: 
*${msg}*
É isso mesmo? Pra confirmar ou mudar é só clicar em um dos botões abaixo`

    banco.db[user].stage = 3
    banco.db[user].nome = msg

    return [confirma_nome]
}

exports.execute = execute