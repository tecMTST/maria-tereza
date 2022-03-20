const {sim, nao, souUmBotEmTreinamento} = require("../strings");
const {db} = require("../banco");
const {confirmaSimOuNao} = require("../botoes");
const {tratarReinicio} = require("../fluxo");

async function execute(user, message, client) {
    tratarReinicio(message, user);

    let msgEnviarImagemAnexo;
    if (message === sim) {
        msgEnviarImagemAnexo = 'Show! Deseja enviar alguma imagem em anexo também?';
        db[user].stage = 6
    } else if (message === nao) {
        msgEnviarImagemAnexo = `Tá! Digita então, por favor, a mensagem que você deseja enviar`;
        db[user].stage = 4
    } else {
        msgEnviarImagemAnexo = souUmBotEmTreinamento
    }

    await confirmaSimOuNao(client, user, msgEnviarImagemAnexo)

}

exports.execute = execute