const banco = require("../banco");
const botoes = require('../botoes')

async function execute(user, msg, client) {

    let fraseSaudacao = `Olá! 🤖
Eu sou a Maria Tereza, um *robô* que envia suas mensagens para integrantes de grupos de WhatsApp do MTST!

Envie uma mensagem para mim (com ou sem arquivos em anexo), e eu a repassarei para os integrantes de algum determinado grupo

O requisito básico é que tanto EU quanto VOCÊ estejamos no mesmo grupo para o qual você deseja enviar a mensagem

As mensagens NÃO serão enviadas para o chat do grupo em si, mas sim de forma INDIVIDUAL para os participantes do grupo

Eu vou começar listando os grupos nos quais eu e você estamos inseridos. Deseja prosseguir?`

    return new Promise((resolve) => {

        banco.db[user].stage = 1

        resolve([fraseSaudacao])
    });
}

exports.execute = execute