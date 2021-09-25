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

//set the view/templating engine
app_obj.set('view engine', 'ejs');
//set the views folder (default is views so this is redundant.)
app_obj.set('views', 'views');



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
  //ejs uses .render instead of .sendFile
  resp.status(404).render('404', {page_title: '404 Page Not Found'});
    //.render(view_file_name_w_out_ext, obj_vars_to_pass_to_view)
})

//replaced by app_obj.listen(port#);
//const server_obj = http.createServer(app_obj);
//server_obj.listen(3000);

app_obj.listen(3000);