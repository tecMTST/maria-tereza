const {db} = require("../banco");
const {enviaMensagem, enviaImagem} = require("../mensagens");
const {tratarReinicio} = require("../fluxo");

async function execute(user, message, client) {
    tratarReinicio(message, user);

    await enviaImagem(client, user, message)
}

exports.execute = execute