const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if(interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  })
});

server.listen(port, () => console.log(`Server running on port ${port}`));

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get (
      "https://api.darksky.net/forecast/f99e836076c70a46d407fa40c22a8f62/37.8267,-122.4233"
    );
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch(error) {
    console.log(`Error: ${error.code}`);
  }
};