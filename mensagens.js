async function enviaMensagem(client, from, message) {
    await client.sendText(from, message).catch((erro) => console.log(erro))
}

async function enviaImagem(client, from, image) {
    await client.sendImageFromBase64(from, image).catch((erro) => console.log(erro))
}

module.exports = {
    enviaMensagem,
    enviaImagem
}