const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { generateMessage, generateLocationMessage } = require('./utils/message')
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
// const userRoutes = require('./routes/user')
// const courseRoutes = require('./routes/course')

//Server connection
const port = process.env.PORT || 3000;
const server = http.createServer(app);
let io = socketIO(server);

dotenv.config();

mongoose.connect(
  "mongodb+srv://aj:ajmani@cluster0-c60su.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Database Connected"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Listening to the io event
io.on("connection", socket => {
  console.log("A new User Connected");

  //message to everyone who connects
  socket.emit("newMessage", generateMessage('Admin', 'Welcome to the channel'));

  //Message when a new User JOins
  socket.broadcast.emit("newMessage", generateMessage('Admin','New User Joined'));
  
  
  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    // broadcasting message to everyone
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback('This is Server')
  });

  //capturing current location
  socket.on("createLocationMessage",(coords)=>{
    io.emit("newLocationMessage", generateLocationMessage('Admin', coords.lat, coords.lng))
  })
  socket.on("disconnect", () => {  
    console.log("User Disconnected");
  });
});

//Render Files
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile("/public", { root: __dirname });
});

// app.use('/user', userRoutes)

// app.use('/course', courseRoutes)

// server.listen(port, () => {
//     console.log(`Server is on $(port)`);
// })

server.listen(process.env.PORT || 3000);
console.log("BackEnd Server Is On=", process.env.PORT || 3000);
