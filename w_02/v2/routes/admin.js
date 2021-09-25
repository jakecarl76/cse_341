const path_mod = require('path');

const express_mod = require('express');

const root_dir = require('../util/path');

//have express mod create a router object
const router = express_mod.Router();

//var to store submitted product info
const products = [];

//add request handling to router
router.get( '/add-product', (req, resp, next) => {
  console.log('add-product-page');
  //resp.sendFile(path_mod.join(__dirname, '..', 'views', 'add-product.html'));
  resp.render('add-product', {
    page_title: 'Add A New Product',
    path: '/admin/add-product'});
});

//router.post() same as router.use(), 
  //but only works for requests using POST method
router.post('/add-product', (req, resp, next) => {
  console.log("product page:");
  console.log(req.body);
  //extract form data title from the given request data body
  products.push({title: req.body.title});//dummy db, would not want to actually do this!
  resp.redirect('/');
});


//exports
module.exports.routes = router;
exports.products = products;