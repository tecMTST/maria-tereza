const venom = require("venom-bot");
const { io } = require("socket.io-client");
require('dotenv/config');

venom
  .create()
  .then((client) => {
    const socket = io(
      `http://${process.env.SOCKET_HOST}:${process.env.SOCKET_PORT}`,
    );

    socket.on("connect", () => {
      console.log("websocket conectado"); // true
    });

    socket.on("message", (...args) => {
      const { message, to } = args[0];
      client.sendText(`${to}@c.us`, message).catch((erro) => {
        throw new Error(erro);
      });
    });

    socket.on("buttons", (...args) => {
      const { to, title, subtitle, buttons } = args[0];
      client
        .sendButtons(`${to}@c.us`, title, buttons, subtitle)
        .catch((erro) => {
          throw new Error(erro);
        });
    });
  })
  .catch((erro) => {
    console.log(erro);
  });
