const {db} = require("./banco");
const {reiniciar, voltar} = require("./strings");

function tratarReinicio(message, user) {
    if (message.toLowerCase() === reiniciar || message.toLowerCase() === voltar) {
        db[user].stage = 0
    }
}

module.exports = {
    tratarReinicio
}