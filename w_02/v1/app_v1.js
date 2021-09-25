//const http = require('http');//no longer needed with express js

//import express into doc
const express = require('express');

//create an express object
const app_obj = express();

app_obj.use((req, resp, next) => {
  console.log('In the middleware.');
  next();//must call to reach next middleware func. (ie, calls next middleware func [app_obj.use])
  console.log('end first middleware');
});
app_obj.use((req, resp, next) => {
  console.log('In another middleware.');
  resp.send("<h1> Hello from the middleware response function!</h1>")
});

//replaced by app_obj.listen(port#);
//const server_obj = http.createServer(app_obj);
//server_obj.listen(3000);

app_obj.listen(3000);