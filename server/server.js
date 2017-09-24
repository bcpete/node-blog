require('./config/config');
const express    = require('express');
const bodyParser = require('body-parser');
const {Category} = require('./models/category');
const {mongoose} = require('./db/mongoose');
const {Post}     = require('./models/post');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/categories', (req, res) => {
  Category.find({}).then((categories) => {
    res.send(categories);
  }, (e) => {
    res.status(400).send();
  });
});

app.post('/categories', (req, res) => {
  var category = new Category({
    name:req.body.name,
  });

  category.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send();
  });
});

app.get('/categoies/:id/posts')

app.listen(port, () => {
  console.log(`Server up on ${port}`);
});

module.exports = {app};