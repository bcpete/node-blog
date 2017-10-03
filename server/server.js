require('./config/config');
const express    = require('express');
const bodyParser = require('body-parser');
const {Category} = require('./models/category');
const {mongoose} = require('./db/mongoose');
const {Post}     = require('./models/post');
const {ObjectID} = require('mongodb');
const moment     = require('moment');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/categories', (req, res) => {
  Category.find({}).then((categories) => {
    res.send({categories});
  }, (e) => {
    res.status(400).send();
  });
});

app.get('/posts/category/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  
  Post.find({
    _category: id
  }).then((posts) => {
    res.send({posts});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/posts/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Post.find({
    _id: id
  }).then((post) => {
    res.send({post});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/categories/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Category.findOne({
    _id: id
  }).then((category) => {
    if(!category){
      return res.status(404).send();
    }
    res.send({category});
  }).catch((e) => {
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

app.post('/posts', (req, res) => {
  var post = new Post({
    title: req.body.title,
    body: req.body.body,
    createdAt: moment().valueOf(),
    _category: req.body._category
  });

  post.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Server up on ${port}`);
});

module.exports = {app};