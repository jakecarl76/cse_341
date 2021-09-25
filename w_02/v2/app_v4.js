//const http = require('http');//no longer needed with express js

const path_mod = require('path');

//import express into doc
const express = require('express');

//import parser
const bodyParser_mod = require('body-parser');

//import custome middleware routing functions
const admin_data = require('./routes/admin');

const shop_routes = require('./routes/shop');

//create an express object
const app_obj = express();



//set up to use body parser to parse the incoming request
  //object passed to it is its config options --> if it should
  //be able to parse non-default features
app_obj.use(bodyParser_mod.urlencoded({extended: false}));
//express module .static(path_str) --> allows clients to access given path
  //w\out needing an app_obj.use() to grant specific access/serve it
app_obj.use(express.static(path_mod.join(__dirname, 'public')));

app_obj.use('/admin', admin_data.routes);
app_obj.use(shop_routes);

//add an error 404 catcher
app_obj.use((req, resp, next) =>{
  resp.status(404).sendFile(path_mod.join(__dirname, 'views', '404.html'));
})

//replaced by app_obj.listen(port#);
//const server_obj = http.createServer(app_obj);
//server_obj.listen(3000);

app_obj.listen(3000);