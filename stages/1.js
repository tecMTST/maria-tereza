const {db} = require("../banco");
const {sim, nao, souUmBotEmTreinamento} = require("../strings")
const {enviaMensagem} = require("../mensagens");
const {listaGruposEmComum} = require("../grupos");
const {tratarReinicio} = require("../fluxo");


async function execute(user, message, client) {
    tratarReinicio(message, user);

    let fraseConfirmaGruposEmComum;

    if (message === sim) {
        fraseConfirmaGruposEmComum = 'Espere só um momento enquanto eu busco os grupos que eu e você ambos fazemos parte...';
        db[user].stage = 2
    } else if (message === nao) {
        fraseConfirmaGruposEmComum = 'Opa, beleza então! Se mudar de ideia é só me chamar, tá?';
        db[user].stage = 0
    } else {
        fraseConfirmaGruposEmComum = souUmBotEmTreinamento
    }

    await enviaMensagem(client, user, fraseConfirmaGruposEmComum)

    if (message === sim) {
        await listaGruposEmComum(client, user);
    }

}

exports.execute = execute

