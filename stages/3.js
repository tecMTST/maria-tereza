const {db} = require("../banco");
const {sim, nao, souUmBotEmTreinamento} = require("../strings")
const {listaGruposEmComum} = require("../grupos");
const {enviaMensagem} = require("../mensagens");

async function execute(user, message, client) {
    // tratarReinicio(message, user);

    let fraseConfirmaTexto;
    if (message === sim) {
        fraseConfirmaTexto = 'Show! Agora digite logo abaixo a mensagem que você quer enviar';
        db[user].stage = 4
    } else if (message === nao) {
        fraseConfirmaTexto = `Tá. Vou então listar novamente os grupos que eu e você ambos fazemos parte, e aí você escolhe.
 Só um instante...`;
        db[user].stage = 2
    } else {
        fraseConfirmaTexto = souUmBotEmTreinamento;
    }

    await enviaMensagem(client, user, fraseConfirmaTexto)

    if (message === nao) {
        await listaGruposEmComum(client, user);
    }
}

exports.execute = execute