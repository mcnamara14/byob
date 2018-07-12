process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
const mockRestaurantData = require('./__mocks__ /restaurants')

chai.use(chaiHttp);

describe('Client Routes', () => {
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  it('should return a response from restaurants', done => {
    chai.request(server)
      .get('/api/v1/restaurants')
      .end((err, response) => {
        response.should.have.status(200);
        // response.res.text.should.equal('We\'re going to test all the routes!');
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /api/v1/restaurants', () => {
    it('should return all of the restaurants', done => {
      chai.request(server)
        .get('/api/v1/restaurants')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(20);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('address');
          response.body[0].should.have.property('zip');
          response.body[0].should.have.property('city');
          response.body[0].should.have.property('state');
          response.body[0].should.have.property('phone');
          response.body[0].should.have.property('website');
          response.body[0].should.have.property('monday');
          response.body[0].should.have.property('tuesday');
          response.body[0].should.have.property('wednesday');
          response.body[0].should.have.property('thursday');
          response.body[0].should.have.property('friday');
          response.body[0].should.have.property('saturday');
          response.body[0].should.have.property('sunday');
          done();
        });
    });
  });
  describe('GET /api/v1/restaurants/4', () => {
    it('should return the first restaurant', done => {
      chai.request(server)
        .get('/api/v1/restaurants/4')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Lodo\'s Bar & Grill');
          response.body[0].should.have.property('address');
          response.body[0].should.have.property('zip');
          response.body[0].should.have.property('city');
          response.body[0].should.have.property('state');
          response.body[0].should.have.property('phone');
          response.body[0].should.have.property('website');
          response.body[0].should.have.property('monday');
          response.body[0].should.have.property('tuesday');
          response.body[0].should.have.property('wednesday');
          response.body[0].should.have.property('thursday');
          response.body[0].should.have.property('friday');
          response.body[0].should.have.property('saturday');
          response.body[0].should.have.property('sunday');
          done();
        });
    });
  });

  describe('GET /api/v1/drinks', () => {
    it('should return all of the drinks', done => {
      chai.request(server)
        .get('/api/v1/drinks')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('description');
          response.body[0].should.have.property('best_deal');
          response.body[0].should.have.property('restaurant_id');
          done();
        });
    });
  });
});