const express = require('express');
const fs = require('fs');
const path = require('path');
const handler = require('./handler');
const router = express.Router();

router.get('/', (req, res) => {
//  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
  const pathToCart = path.join(__dirname,'db/userCart.json');
  fs.readFile(path.join(__dirname,'db/userCart.json'), 'utf-8', (err, data) => {
      if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
//  handler(req, res, 'add', './server/db/userCart.json');
  handler(req, res, 'add', path.join(__dirname,'db/userCart.json'));
});
// localhost:3000/api/cart/123 // req.params.id
// localhost:3000/api/cart/?var1='sfsf'&var2='ada' // req.query
router.put('/:id', (req, res) => {
//  handler(req, res, 'change', './server/db/userCart.json');
  handler(req, res,'change', path.join(__dirname,'db/userCart.json'));
});

router.delete('/:id', (req, res) => {
  handler(req, res,'del', path.join(__dirname,'db/userCart.json'));
});


module.exports = router;
