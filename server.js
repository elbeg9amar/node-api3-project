const express = require('express');
const morgan = require('morgan')
const postRouter = require("./posts/postRouter.js")
const userRouter = require("./users/userRouter")


const server = express();

const log = morgan("combined")



server.use(express.json());
server.use(log);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
