const banco = require("../banco");
const stages = require("../stages")

async function execute(user, msg, client) {
    return new Promise(async (resolve) => {

        let frase_nome;
        if (msg === 'Tá osso!') {
            frase_nome = 'Massa! Pra começar, me manda seu nome completo, por favor';
            banco.db[user].stage = 2
        } else {
            frase_nome = `🥺 Eu até queria conversar mas só me ensinaram a fazer cadastro

👆 Pra fazer sua incrição é só clicar no botão acima`;
        }

        let groups = [];
        let chats = await client.getAllChats();
        for (let chat of chats) {
            if (chat.isGroup) {
                groups.push(chat);
            }
        }

        let groupsWithUserAndBot = [];
        stages.waiting = true
        for (let group of groups) {
            let members = await client.getGroupMembers(group.id._serialized);

            let hasBot = members.some(member => member.isMe);

            let hasUser = members.some(member => member.id._serialized === user);

            if (hasBot && hasUser) {
                groupsWithUserAndBot.push(group.name);
            }
        }
        stages.waiting = false

        console.log(user);
        console.log(groupsWithUserAndBot);
        resolve(groupsWithUserAndBot);
    });
}

exports.execute = execute

