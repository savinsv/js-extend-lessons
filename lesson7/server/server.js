const express = require('express');
const fs = require('fs');
const path = require('path');
const cartRouter = require('./cartRouter');
const app = express();
//const pp = path.join(__dirname,'..');
const ppp = path.join(path.join(__dirname,'..'),'public');

app.use(express.json());
//app.use('/', express.static('/public'));
app.use('/', express.static(path.join(path.join(__dirname,'..'),'public')));
//path.join(__dirname,'..')
//console.log()
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
//  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
  fs.readFile(path.join(__dirname,'db/products.json'), 'utf-8', (err, data) => {
    if (err) {
//      console.log(err);
      res.send(JSON.stringify({result: 0, text: err}));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
