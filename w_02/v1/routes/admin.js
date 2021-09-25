const path_mod = require('path');

const express_mod = require('express');

const root_dir = require('../util/path');

//have express mod create a router object
const router = express_mod.Router();

//add request handling to router
router.get( '/add-product', (req, resp, next) => {
  console.log('add-product-page');
  //resp.sendFile(path_mod.join(__dirname, '..', 'views', 'add-product.html'));
  resp.sendFile(path_mod.join(root_dir, 'views', 'add-product.html'));
});

//router.post() same as router.use(), 
  //but only works for requests using POST method
router.post('/add-product', (req, resp, next) => {
  console.log("product page:");
  console.log(req.body);
  resp.redirect('/');
});


//export our modified router object for our server to use
module.exports = router;