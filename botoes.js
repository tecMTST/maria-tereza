const botaoSaudacaoVar = [
    {
        "buttonText": {"displayText": "Tá osso!"}
    }
];

const botoesConfirmacao = [
    {
        "buttonText": {"displayText": "Sim!"}
    },
    {
        "buttonText": {"displayText": "Não!"}
    }
];


function botaoSaudacao(client) {
    client.sendButtons(message.from, resposta[0], botao, ' ')
}

module.exports = {
    botaoSaudacao,
    botoesConfirmacao
}