const banco = require("../banco");

function execute(user, msg) {
    let frase_saudacao = `Oiê! 🤖 Sou um *robô* treinado pra fazer as inscrições!

🦴 O curso *Por que tá osso?* foi preparado pelo *Setor de Formação Política* para ajudar a explicar porque as *coisas andam tão caras*

🗓️ A aula será online pelo *google meet* nessa quinta, dia 21/10 às 19h

⁉️ Se tiver qualquer problema pra se inscrever, mande uma mensagem para wa.me/5511981823068

✍️ Se quiser participar é só *clicar no botão abaixo* que faço sua inscrição agora mesmo!`

    banco.db[user].stage = 1

    return [frase_saudacao]
}

exports.execute = execute