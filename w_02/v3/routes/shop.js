const path_mod = require('path');

const express_mod = require('express');
const router = express_mod.Router();

const root_dir = require('../util/path');

const admin_data = require('./admin');

router.get( '/', (req, resp, next) => {
  console.log('root-page');
  console.log(admin_data.products);
  //get the products from arr
  const products = admin_data.products;
  resp.render('shop',
    { products: products,
      page_title: 'Shop',
      path: '/'
      });//w/cust root dir path
});

module.exports = router;