const path_mod = require('path');

const express_mod = require('express');
const router = express_mod.Router();

const root_dir = require('../util/path');

router.get( '/', (req, resp, next) => {
  console.log('root-page');
  //resp.sendFile(path_mod.join(__dirname, '..', 'views', 'shop.html'));//w/out custome root dir
  resp.sendFile(path_mod.join(root_dir, 'views', 'shop.html'));//w/cust root dir path
});

module.exports = router;