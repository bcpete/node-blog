const {ObjectID} = require('mongodb');
const {Category} = require('./../../models/category');
const {Post}     = require('./../../models/post');
const moment     = require('moment');

const firstCategoryId = new ObjectID();
const secondCategoryId = new ObjectID();
const thirdCategoryId = new ObjectID();

const posts = [{
  _id: new ObjectID(),
  title: 'First Post',
  body: 'First Body',
  _category: firstCategoryId
}, {
  _id: new ObjectID(),
  title: 'Second Post',
  body: 'Second Body',
  _category: secondCategoryId
}, {
  _id: new ObjectID(),
  title: 'Third Post',
  body: 'Third Body',
  _category: firstCategoryId
}]

const categories = [{
  _id: firstCategoryId,
  name: 'First Category'
}, {
  _id: secondCategoryId,
  name: 'Second Category'
}, {
  _id: thirdCategoryId,
  name: 'Third Category'
}];

const populatePosts = (done) => {
  Post.remove({}).then(() => {
    return Post.insertMany(posts);
  }).then(() => done());
};

const populateCategories = (done) => {
  Category.remove({}).then(() => {
    return Category.insertMany(categories);
  }).then(() => done());
};

module.exports = {categories, posts, populatePosts, populateCategories};
