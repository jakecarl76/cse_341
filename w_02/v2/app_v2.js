//const http = require('http');//no longer needed with express js

//import express into doc
const express = require('express');

//create an express object
const app_obj = express();

//as long as you call next(), you can use general request handling
//before the specific request handling to do something or run
//code for every or a range of requests (eg a counter/etc)
app_obj.use('/', (req, resp, next)=>{
  console.log("this always runs.");
  next();
});

//specific request handling
app_obj.use( '/add-product', (req, resp, next) => {
  console.log('In another middleware.');
  resp.send("<h1> Add Product</h1>")
});
//more general request handling
app_obj.use( '/', (req, resp, next) => {
  console.log('In another middleware.');
  resp.send("<h1> Hello from the middleware response function!</h1>")
});

//replaced by app_obj.listen(port#);
//const server_obj = http.createServer(app_obj);
//server_obj.listen(3000);

app_obj.listen(3000);