const {db} = require("./banco");
const {enviaBotoes, fabricarBotoes} = require("./botoes");
const {enviaMensagem} = require("./mensagens")

async function buscaGruposEmComum(client, user) {
    let grupos = [];
    let conversas = await client.getAllChats();
    for (let conversa of conversas) {
        if (conversa.isGroup) {
            grupos.push(conversa);
        }
    }

    let gruposEmComum = [];
    for (let grupo of grupos) {
        let membros = await client.getGroupMembers(grupo.id._serialized);

        let temBot = membros.some(member => member.isMe);

        let temUsuario = membros.some(member => member.id._serialized === user);

        if (temBot && temUsuario) {
            gruposEmComum.push(grupo.name);
            db[user]['grupos_em_comum'].push({id: grupo.id._serialized, nome: grupo.name});
        }
    }
    return gruposEmComum;
}

async function listaGruposEmComum(client, user) {
    db[user].waiting = true
    let gruposEmComum = await buscaGruposEmComum(client, user);
    db[user].waiting = false

    if (gruposEmComum.length > 0) {
        let botoesGrupos = fabricarBotoes(gruposEmComum);

        await enviaBotoes(client,
            user,
            'Achei esses grupos aqui! Para qual deles você deseja mandar a sua mensagem?',
            botoesGrupos);

    } else if (gruposEmComum.length === 0) {
        db[user].stage = 0

        let mensagemNenhumGrupoEmComum = `Opa!

Infelizmente eu e você não temos nenhum grupo de WhatsApp em comum!
 
Sugiro que entre em contato com algum(a) supervisor(a) e os informe dessa situação!

Qualquer coisa só me chamar novamente, tá?`

        await enviaMensagem(client, user, mensagemNenhumGrupoEmComum)

    }
}

module.exports = {
    listaGruposEmComum
}