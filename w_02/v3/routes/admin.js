const path_mod = require('path');

const express_mod = require('express');

const root_dir = require('../util/path');

//have express mod create a router object
const router = express_mod.Router();

//var to store submitted product info
const products = [];
let item_id = 0;

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
  let tmp_item = {id: item_id,
                  title: req.body.title,
                  img_link: req.body.img_link == '' ? '/imgs/default.png' : req.body.img_link,
                  price: req.body.item_price,
                  desc: req.body.item_desc,
                  rating: req.body.item_rating,
                 };
  item_id++;//inc id num
  products.push(tmp_item);//dummy db, would not want to actually do this!
  resp.redirect('/');
});

//delete selected object
router.post('/delete-product', (req, resp, next) => {
  console.log("deleting product: " + req.body.item_id)
  //get id
  let tmp_id = req.body.item_id;
  //check id/get index
  let tmp_index = get_product_index(tmp_id);
  //check for error
  if(tmp_index == -1)
  {
    //redirect to error 404
    resp.redirect('/error');
  }
  else
  {
    //remove the item from the list
    remove_item(tmp_index);
    //redirect to error 404
    resp.redirect('/admin/shop');
  }
});

//admin view of shop to edit list
router.get( '/shop', (req, resp, next) => {
  console.log('add-product-page');
  resp.render('shop', 
              { products: products,
                page_title: 'Edit Product List',
                path: '/admin/shop'});
});


function get_product_index(item_id)
{
  for(let i = 0; i < products.length; i++)
  {
    if(item_id == products[i].id)
    {
      return i;
    }
  }
  //failed to find id in product list
  return -1;
}

function remove_item(index)
{
  products.splice(index, 1);
}
//exports
module.exports.routes = router;
exports.products = products;