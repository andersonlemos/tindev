const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const winston = require('winston');
const server  = express();
const routes = require('./routes');
const database = 'mongodb+srv://omnistack:omnistack@cluster0-3vaz8.mongodb.net/omnistack8?retryWrites=true&w=majority';

mongoose.connect(database,{useNewUrlParser:true});

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333, () => {
    console.log('Server Running on 3333');
})
