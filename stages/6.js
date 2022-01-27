const banco = require("../banco");

function execute(user, msg) {
    let confirma_cidade = `Sua cidade então é:
*${msg}*
Isso mesmo?`

    banco.db[user].stage = 7
    banco.db[user].cidade = msg

    return [confirma_cidade]
}

exports.execute = execute