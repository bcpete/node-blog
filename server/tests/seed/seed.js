const {ObjectID} = require('mongodb');
const {Category} = require('./../../models/category');

const categories = [{
  _id: new ObjectID(),
  name: 'First Category'
}, {
  _id: new ObjectID(),
  name: 'Second Category'
}, {
  _id: new ObjectID(),
  name: 'Third Category'
}];

const populateCategories = (done) => {
  Category.remove({}).then(() => {
    return Category.insertMany(categories);
  }).then(() => done());
};

module.exports = {categories, populateCategories};
