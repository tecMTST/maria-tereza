const banco = require("../banco");

function execute(user, msg) {
    if (msg === 'Sim!') {
        var frase_email = 'E por último, me manda seu email'
        banco.db[user].stage = 10
    } else if (msg === 'Não!') {
        var frase_email = 'Opa, tranquilo. Qual sua Ocupação ou Setor no movimento então?'
        banco.db[user].stage = 8
    } else {
        var frase_email = `😅 Sou um bot em treinamento, não sei muitas palavras

🔘 Então peço que você use os botões pra confirmar suas informações tá bom? Clica ali em cima em um deles que eu volto a funcionar normalmente`
    }

    return [frase_email]
}

exports.execute = execute