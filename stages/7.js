const banco = require("../banco");

function execute(user, msg) {
    if (msg === 'Sim!') {
        var frase_movimento = 'E de que Ocupação ou Setor do movimento você é?'
        banco.db[user].stage = 8
    } else if (msg === 'Não!') {
        var frase_movimento = 'Opa, voltando então. De que cidade você é?'
        banco.db[user].stage = 6
    } else {
        frase_movimento = `😅 Sou um bot em treinamento, não sei muitas palavras

🔘 Então peço que você use os botões pra confirmar suas informações tá bom? Clica ali em cima em um deles que eu volto a funcionar normalmente`
    }

    return [frase_movimento]
}

exports.execute = execute