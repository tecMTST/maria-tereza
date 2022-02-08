const banco = require("./banco.js")
const stages = require("./stages.js")
const venom = require('venom-bot')


function getStage(user) {
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
    .create({
        session: 'maria-tereza',
        multidevice: true
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro)
    })


function start(client) {
    client.onMessage(async (message) => {
        if (message.sender.id === '558496748039@c.us') {
            const estadoMensagem = getStage(message.from)

            if (message.isGroupMsg === false && estadoMensagem < 12) {
                await stages[estadoMensagem].especificacao.execute(
                    message.from,
                    message.body,
                    client
                ).then(async (resposta) => {
                    if (confirmacoes.includes(estadoMensagem)) {
                        if (estadoMensagem === 0) {
                            await client.sendButtons(message.from, resposta[0], botao, ' ')
                                .catch((erro) => console.log(erro))
                        } else {
                            await client.sendButtons(message.from, 'Confirmação', botoes, resposta[0])
                                .catch((erro) => console.log(erro))
                        }
                    } else {
                        await client.sendText(message.from, `${resposta[0]}`)
                            .catch((erro) => console.log(erro))
                    }

                })
            }
        }
    })
}