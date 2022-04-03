const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

const dispatchEvent = (message, ws) => {
  const json = JSON.parse(message);

  switch (json.event) {
    case "new-message":
      webSocketServer.clients.forEach((client) => client.send(message));
      ws.send(
        JSON.stringify({
          event: "new-message",
          message: {
            text: "dsdsf",
            id: 1,
          },
        })
      );
    default:
      ws.send(new Error("Wrong query").message);
  }
};

webSocketServer.on("connection", (ws) => {
  // console.log("dsfds");
  ws.on("message", (m) => dispatchEvent(m, ws));
  ws.on("error", (e) => ws.send(e));

  // ws.send("Hi there, I am a WebSocket server");
});

server.listen(3000, () => console.log("Server started"));
