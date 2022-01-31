const banco = require("./banco.js")
const stages = require("./stages.js")
const venom = require('venom-bot')

// lista de números dos quais aceitamos mensagens, principalmente para desenvolvimento
const whitelist = process.env.WHATSAPP_WHITELIST &&
  process.env.WHATSAPP_WHITELIST
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => `${n}@c.us`);

function getStage(user){
    const estado = banco.db[user] && banco.db[user].stage || 0
    if (!banco.db[user]) {
        banco.db[user] = {stage: 0}
    }

    return estado 
}

const confirmacoes = [0, 2, 4, 6, 8, 10]

var botoes = [
    {
      "buttonText": {"displayText": "Sim!"}
    },
    {
      "buttonText": {"displayText": "Não!"}
    }
]

var botao = [
    {
        "buttonText": {"displayText": "Tá osso!"}
    }
]

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro)
})

function start(client) {
    client.onMessage(async (message) => {
        if (whitelist.includes(message.sender.id)) {
            const estado_mensagem = getStage(message.from)
    
            if (message.isGroupMsg === false && estado_mensagem < 12) {
                let resposta = stages.step[estado_mensagem].obj.execute(
                    message.from,
                    message.body
                )
    
                if (confirmacoes.includes(estado_mensagem)) {
                    if (estado_mensagem == 0) {
                        client.sendButtons(message.from, resposta[0], botao, ' ')
                        .catch((erro) => console.log(erro))
                    } else {
                        client.sendButtons(message.from, 'Confirmação', botoes, resposta[0])
                        .catch((erro) => console.log(erro))
                    }
                } else {
                    await client.sendText(message.from, resposta[0])
                    .catch((erro) => console.log(erro))
                }
            }
        }
    })
}