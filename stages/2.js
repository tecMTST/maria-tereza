const {db} = require("../banco");
const {confirmaSimOuNao, enviaMensagem} = require("../botoes");
const {listaGruposEmComum} = require("../grupos");
const {tratarReinicio} = require("../fluxo");

async function execute(user, message, client) {
    tratarReinicio(message, user);

    // Grupo válido
    if (db[user]['grupos_em_comum'].find(o => o.nome === message)) {
        let fraseConfirmaGrupoEscolhido = `Só pra confirmar aqui. Você deseja então mandar mensagem para o grupo: 
*${message}*
É isso mesmo? Pra confirmar ou mudar é só clicar em um dos botões abaixo`

        db[user].stage = 3
        db[user].grupo_escolhido = message

        await confirmaSimOuNao(client, user, fraseConfirmaGrupoEscolhido)
    } else {
        let mensagemGrupoInvalido = `Vixe! *${message}*? Parece que esse grupo não é válido não!
Deixa eu te mandar novamente a lista de grupos que eu e você ambos temos em comum. Só um instante...`
        await enviaMensagem(client, user, mensagemGrupoInvalido)

        await listaGruposEmComum(client, user)
    }
}

exports.execute = execute