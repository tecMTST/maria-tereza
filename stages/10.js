const banco = require("../banco");

function execute(user, msg) {
    let confirma_email = `Seu email é:
${msg}
Confirma?`

    banco.db[user].stage = 11
    banco.db[user].email = msg

    return [confirma_email]
}

exports.execute = execute