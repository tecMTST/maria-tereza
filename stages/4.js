const {db} = require("../banco");
const banco = require("../banco");
const {confirmaSimOuNao} = require("../botoes");
const {tratarReinicio} = require("../fluxo");

async function execute(user, message, client) {
    tratarReinicio(message, user);

    let confirmaMsg = `_Você irá enviar a seguinte mensagem pro *${db[user].grupo_escolhido}*, certo?_
    
${message}`

    banco.db[user].stage = 5

    await confirmaSimOuNao(client, user, confirmaMsg)
}

exports.execute = execute