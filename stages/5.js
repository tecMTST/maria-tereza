const banco = require("../banco");

function execute(user, msg) {
    if (msg === 'Sim!') {
        var frase_cidade = 'Boa, agora me envia por favor qual é a cidade que você mora'
        banco.db[user].stage = 6
    } else if (msg === 'Não!') {
        var frase_cidade = 'Então vamos voltar na última pergunta.  Qual é seu Estado?'
        banco.db[user].stage = 4
    } else {
        var frase_cidade = `😅 Sou um bot em treinamento, não sei muitas palavras

🔘 Então peço que você use os botões pra confirmar suas informações tá bom? Clica ali em cima em um deles que eu volto a funcionar normalmente`
    }

    return [frase_cidade]
}

exports.execute = execute