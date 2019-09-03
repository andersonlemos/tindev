const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const winston = require('winston');

const app  = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');
const database = 'mongodb+srv://omnistack:omnistack@cluster0-3vaz8.mongodb.net/omnistack8?retryWrites=true&w=majority';

mongoose.connect(database,{useNewUrlParser:true});

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  const connectedUsers = {};

  io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log(user,socket.id);
    connectedUsers[user] = socket.id;
  });

  app.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
  });
  app.use(cors());
  app.use(express.json());
  app.use(routes);

  server.listen(3333, () => {
    console.log('Server Running on 3333');
})
