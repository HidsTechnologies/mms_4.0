require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const ws = require("ws");

// wss server with cors
const wss = new ws.Server({
  server,
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "static/index.html");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (data) => {
    console.log(data);
    // broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on("close", () => {
    clients.pop(ws);
    console.log("user disconnected", clients.length);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
