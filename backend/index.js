const express = require("express");
const app = express();
const Moralis = require("moralis").default;
const cors = require("cors");
require("dotenv").config();
require("./db/db");
const { createServer } = require("http");
const { addSocketUser, removeSocketUser } = require("./util/socketHandlers");
const { Server } = require("socket.io");
const webhookController = require("./controller/webhookController");
const searchController = require("./controller/searchController");
const subscribeController = require("./controller/subscribeController");
const path = require("path");
const PORT = process.env.PORT || 5000;
require("./services/autoDecrement");

const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET","POST"],
    credentials: true,
}
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,"build"))); //react build

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

// websocket connection
io.on("connection",(socket)=>{
  console.log("user connected");

  socket.on("new-user",(email)=>{
    console.log("user connected: ",socket.id,email);
    addSocketUser(email,socket.id);
  })

  socket.on("disconnect",()=>{
    removeSocketUser(socket.id);
    console.log("user disconnected");
  })
})

app.post("/webhook",(req,res,next)=>{
  req.io = io;
  next();
},webhookController);

app.post("/search/:add", searchController);

app.post("/subscribe/:add", subscribeController);

server.listen(PORT, (req, res) => {
  console.log(`server running on port: ${PORT}`);
});