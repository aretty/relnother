"use strict"

const express = require('express')
const http = require("http")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
var passport = require('passport');
const axios = require('axios');

const dotenv = require("dotenv")
dotenv.config();

const app = express()

const path = require("path")
const PORT = process.env.PORT || 8001;
const socketIO = require("socket.io")
const page = require("./src/routes/page") //라우팅
const authRouter = require("./src/routes/page/auth") 

const server = http.createServer(app)
const io = socketIO(server);

io.on("connection",(socket) =>{
  const welcome = {
      name : 'admin',
      msg : '채팅방에 연결되었습니다. 자유롭게 소통해 보세요!',
      type : 'welcome'
  };
  io.emit("chatting-lobby",welcome);

  socket.on("chatting-lobby",(data)=>{
      io.emit("chatting-lobby",data)
  })
})

//앱 세팅
app.set('views', __dirname + '/src/views')
app.set('view engine', 'ejs')

app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: new MemoryStore({
      checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
    }),
    cookie: {
      httpOnly: true,
      secure: false,
    },
}));
app.use(express.static(path.join(__dirname,"src","public")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use("/",page) //use -> 미들웨어 등록
app.use("/auth",authRouter) 

app.use(passport.initialize());
// app.use(passport.session());

server.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`)
})
// web.js