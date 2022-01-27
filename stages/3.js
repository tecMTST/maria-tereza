const banco = require("../banco");

function execute(user, msg) {
    if (msg === 'Sim!') {
        var frase_estado = 'Agora eu preciso que você me mande de qual Estado você é'
        banco.db[user].stage = 4
    } else if (msg === 'Não!') {
        var frase_estado = 'Opa, vou perguntar de novo então. Qual é seu nome completo?'
        banco.db[user].stage = 2
    } else {
        var frase_estado = `😅 Sou um bot em treinamento, não sei muitas palavras

🔘 Então peço que você use os botões pra confirmar suas informações tá bom? Clica ali em cima em um deles que eu volto a funcionar normalmente`
    }

    return [frase_estado]
}

exports.execute = execute