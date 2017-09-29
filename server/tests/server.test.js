const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Category} = require('./../models/category');
const {categories, populateCategories} = require('./seed/seed');

beforeEach(populateCategories);

describe('CATEGORIES', () => {
  
  describe('GET', () => {
    it('Should get all categories', (done) => {
      request(app)
        .get('/categories')
        .expect(200)
        .expect((res) => {
          expect(res.body.categories.length).toBe(3);
        })
        .end(done);
    });
  });

  describe('GET ID', () => {
    it('Should return individual category', (done) => {
      request(app)
        .get(`/categories/${categories[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.category.name).toBe(categories[0].name);
        })
        .end(done);
    });
  });

  describe('POST', () => {
    var name = 'test category'

    it('Should create a new category', (done) => {
      request(app)
        .post('/categories')
        .send({name})
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(name);
        })
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          Category.find({name}).then((categories) => {
            expect(categories.length).toBe(1)
            expect(categories[0].name).toBe(name);
            done();
          }).catch((e) => done(e));
        });
    });

    it('Should not create a category with invalid body data', (done) => {
      request(app)
        .post('/categories')
        .send({})
        .expect(400)
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          Category.find().then((categories) => {
            expect(categories.length).toBe(3);
            done();
          }).catch((e) => done(e));
        });
    });
  });
});