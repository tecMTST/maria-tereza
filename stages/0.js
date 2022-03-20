const {db} = require("../banco");
const {confirmaSimOuNao} = require('../botoes')

async function execute(user, message, client) {

    let fraseSaudacao =
        `Olá! 🤖
Eu sou a Maria Tereza, um *robô* que envia suas mensagens para integrantes de grupos de WhatsApp do MTST!

Envie uma mensagem para mim (com ou sem arquivos em anexo), e eu a repassarei para os integrantes de algum determinado grupo

O requisito básico é que tanto EU quanto VOCÊ estejamos no mesmo grupo para o qual você deseja enviar a mensagem

As mensagens NÃO serão enviadas para o chat do grupo em si, mas sim de forma INDIVIDUAL para os participantes do grupo

Eu vou começar listando os grupos nos quais eu e você estamos inseridos. Deseja prosseguir?

*Obs.: A qualquer momento você pode digitar 'reiniciar' ou 'voltar', que a gente volta pra esse passo inicial aqui, tá?`

    db[user].stage = 1

    await confirmaSimOuNao(client, user, fraseSaudacao)
}

exports.execute = execute