const banco = require("../banco");

function execute(user, msg) {
    let confirma_estado = `Seu Estado então é:
*${msg}*
Isso mesmo? De novo, pra confirmar ou alterar é só clicar em um dos botões aqui embaixo`

    banco.db[user].stage = 5
    banco.db[user].estado = msg

    return [confirma_estado]
}

exports.execute = execute