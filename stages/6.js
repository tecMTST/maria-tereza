const {db} = require("../banco");
const {enviaMensagem} = require("../mensagens");
const {tratarReinicio} = require("../fluxo");

async function execute(user, message, client) {
    tratarReinicio(message, user);

    let msgEnviar = 'Me envia a imagem aí então por favor';

    db[user].stage = 7

    await enviaMensagem(client, user, msgEnviar)
}

exports.execute = execute