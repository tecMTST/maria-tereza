const banco = require("../banco");

function execute(user, msg) {
    let confirma_movimento = `Então seu Setor ou Ocupação é:
*${msg}*
É isso?`

    banco.db[user].stage = 9
    banco.db[user].movimento = msg

    return [confirma_movimento]
}

exports.execute = execute