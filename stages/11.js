const fs = require('fs')
const banco = require("../banco");

function execute(user, msg) {
    let nome = banco.db[user].nome,
        estado = banco.db[user].estado,
        cidade = banco.db[user].cidade,
        movimento = banco.db[user].movimento,
        email = banco.db[user].email

    if (msg === 'Sim!') {
        var frase_despedida = `😁 Inscrição confirmada! 

📄 Dados da sua inscrição:
Nome: ${nome}
Estado: ${estado}
Cidade: ${cidade}
Atuação no movimento: ${movimento}
Email: ${email}

📩 No dia do curso, eu mando o link da reunião. Até lá

🔥 Quem sabe mais, luta melhor!`   

    banco.db[user].stage = 12
    fs.writeFile(`pqTaOsso.csv`, `${nome},${user},${estado},${cidade},${movimento},${email}\n`, {flag: `a+`}, (e) => console.log(e))
    } else if (msg === 'Não!') {
        var frase_despedida = 'Opa, me manda então agora seu email correto'
        banco.db[user].stage = 10
    } else {
        var frase_despedida = `😅 Sou um bot em treinamento, não sei muitas palavras

🔘 Então peço que você use os botões pra confirmar suas informações tá bom? Clica ali em cima em um deles que eu volto a funcionar normalmente`
    }

    return [frase_despedida]
}

exports.execute = execute