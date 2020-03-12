const express = require("express");

const server = express();

const usersRouter = require("./users/userRouter");

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`${method} to ${endpoint}`);
  next();
}

server.use("/api/users", usersRouter);

module.exports = server;
