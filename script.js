const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log("A client connected!");

  ws.send("Welcome to the Chat!!");

  ws.on('message', (message) => {
    
    messagetext = message.toString();
    console.log(`Received: ${messagetext}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messagetext);
      }
    });
  });

  ws.on('close', () => {
    console.log("A client disconnected!");
  });
});

server.listen(5000);

