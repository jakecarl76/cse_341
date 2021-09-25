//import express
const express_mod = require('express');

//create express app obj
const app_obj = express_mod();

//handle requests
//default (every request)
app_obj.use('/', (req, resp, next) => {
  console.log("request Rx'ed: " + req.url);
  next();
});

app_obj.use('/users', (req, resp, next) => {
  console.log("/users middleware.");
  resp.send("<h1> Welcome to /users</h1>");
});

app_obj.use('/', (req, resp, next) => {
  console.log("default request handler");
  resp.send("<h1>Welcome to assing W02_01</h1>");
});

//start server on port 3000
app_obj.listen(3000);