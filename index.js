const {stages} = require("./stages")
const venom = require('venom-bot')
const {db} = require("./banco");


function getStage(user) {
    const estado = db[user] && db[user].stage || 0
    if (!db[user]) {
        db[user] = {
            stage: 0,
            waiting: false,
            grupos_em_comum: []
        }
    }

    return estado
}


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
        if (message.sender.id === '<seunumero>@c.us') {
            let estadoMensagem = getStage(message.from);

            if (message.isGroupMsg === false
                && stages.hasOwnProperty(estadoMensagem)
                && db[message.from].waiting === false) {

                console.log("state is " + estadoMensagem);
                console.log("banco is " + JSON.stringify(db));
                stages[estadoMensagem].especificacao.execute(message.from, message.body, client);
            }
        }
    })
}