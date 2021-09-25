//const http = require('http');//no longer needed with express js

//import express into doc
const express = require('express');

//import parser
const bodyParser_mod = require('body-parser');

//create an express object
const app_obj = express();

//set up to use body parser to parse the incoming request
  //object passed to it is its config options --> if it should
  //be able to parse non-default features
app_obj.use(bodyParser_mod.urlencoded({extended: false}));

//as long as you call next(), you can use general request handling
//before the specific request handling to do something or run
//code for every or a range of requests (eg a counter/etc)
app_obj.use('/', (req, resp, next)=>{
  console.log("this always runs.");
  next();
});

//specific request handling
app_obj.use( '/add-product', (req, resp, next) => {
  console.log('add-product-page');
  resp.send('<form action="/product" method="POST">'
             + '<input type="text" name="title">'
             + '<button type="submit">Add Product</button></form>');
});

//app_obj.post() same as app_obj.use(), 
  //but only works for requests using POST method
app_obj.post('/product', (req, resp, next) => {
  console.log("product page:");
  console.log(req.body);
  resp.redirect('/');
});


//more general request handling
app_obj.use( '/', (req, resp, next) => {
  console.log('root-page');
  resp.send("<h1> Welcome to root!</h1><a href='/add-product'>Add Product</a>");
});

//replaced by app_obj.listen(port#);
//const server_obj = http.createServer(app_obj);
//server_obj.listen(3000);

app_obj.listen(3000);