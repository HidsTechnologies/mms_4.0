require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const feederClient = [];

// namespace
//feeder namespace
const feederNsp = io.of("/feeder");
feederNsp.on("connection", (socket) => {
  feederClient.push(socket.id);
  console.log("a user connected to feeder", feederClient.length);

  socket.on("data", (data) => {
    console.log(data);
    // broadcast to all clients in the namespace
    feederNsp.emit("data", data);
  });

  socket.on("disconnect", () => {
    feederClient.pop(socket.id);
    console.log("user disconnected from feeder", feederClient.length);
  });
});

// inspection namespace
const inspectionNsp = io.of("/inspection");
inspectionNsp.on("connection", (socket) => {
  console.log("a user connected to inspection");
  socket.on("data", (data) => {
    console.log(data);
    // broadcast to all clients in the namespace
    inspectionNsp.emit("data", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from inspection");
  });
});

// buffer namespace
const bufferNsp = io.of("/buffer");
bufferNsp.on("connection", (socket) => {
  console.log("a user connected to buffer");
  socket.on("data", (data) => {
    console.log(data);
    // broadcast to all clients in the namespace
    bufferNsp.emit("data", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from buffer");
  });
});

// process namespace
const processNsp = io.of("/process");
processNsp.on("connection", (socket) => {
  console.log("a user connected to process");
  socket.on("data", (data) => {
    console.log(data);
    // broadcast to all clients in the namespace
    processNsp.emit("data", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from process");
  });
});

// assembly namespace
const assemblyNsp = io.of("/assembly");
assemblyNsp.on("connection", (socket) => {
  console.log("a user connected to assembly");
  socket.on("data", (data) => {
    console.log(data);
    // broadcast to all clients in the namespace
    assemblyNsp.emit("data", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from assembly");
  });
});
// sorting namespace
const sortingNsp = io.of("/sorting");
sortingNsp.on("connection", (socket) => {
  console.log("a user connected to sorting");
  socket.on("data", (data) => {
    console.log(data);
    // broadcast to all clients in the namespace
    sortingNsp.emit("data", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from sorting");
  });
});

//server listen
server.listen(8080, () => {
  console.log("listening on *:8080");
});
