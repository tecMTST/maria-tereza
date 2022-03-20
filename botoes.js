const {sim, nao} = require('./strings.js')

const botaoSimOuNao = [
    {
        "buttonText": {"displayText": sim}
    },
    {
        "buttonText": {"displayText": nao}
    }
];


function fabricarBotoes(valores) {
    return valores.map(valor => (
        {
            "buttonText": {"displayText": valor}
        }
    ));
}

async function confirmaSimOuNao(client, from, message) {
    await client.sendButtons(from, message, botaoSimOuNao, ' ').catch((erro) => console.log(erro))
}

async function enviaBotoes(client, from, title, buttons, subtitle = ' ') {
    await client.sendButtons(from, title, buttons, subtitle).catch((erro) => console.log(erro))
}

module.exports = {
    fabricarBotoes,
    confirmaSimOuNao,
    enviaBotoes
}