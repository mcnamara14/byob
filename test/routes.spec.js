process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
const mockRestaurantData = require('./__mocks__ /restaurants');

chai.use(chaiHttp);

describe('Client Routes', () => {
  beforeEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        knex.migrate.latest()
          .then(function () {
            return knex.seed.run()
              .then(function () {
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        done();
      });
  });

  it('should return a response from restaurants', done => {
    chai.request(server)
      .get('/api/v1/restaurants')
      .end((err, response) => {
        response.should.have.status(200);
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
  beforeEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        knex.migrate.latest()
          .then(function () {
            return knex.seed.run()
              .then(function () {
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
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
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Ale House');
          response.body[0].should.have.property('address');
          response.body[0].address.should.equal('2501 16th St');
          response.body[0].should.have.property('zip');
          response.body[0].zip.should.equal(80211);
          response.body[0].should.have.property('city');
          response.body[0].city.should.equal('Denver');
          response.body[0].should.have.property('state');
          response.body[0].state.should.equal('CO');
          response.body[0].should.have.property('phone');
          response.body[0].phone.should.equal('(303) 433-9734');
          response.body[0].should.have.property('website');
          response.body[0].website.should.equal('http://www.alehousedenver.com/');
          response.body[0].should.have.property('monday');
          response.body[0].monday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('tuesday');
          response.body[0].tuesday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('wednesday');
          response.body[0].wednesday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('thursday');
          response.body[0].thursday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('friday');
          response.body[0].friday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('saturday');
          (response.body[0].saturday === null).should.be.true;
          response.body[0].should.have.property('sunday');
          (response.body[0].sunday === null).should.be.true;
          done();
        });
    });
  });
  describe('GET /api/v1/restaurants/4', () => {
    it('should return a single restaurant matching the id passed as a param', done => {
      chai.request(server)
        .get('/api/v1/restaurants/4')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(4);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Lodo\'s Bar & Grill');
          response.body[0].should.have.property('address');
          response.body[0].address.should.equal('1946 Martket St');
          response.body[0].should.have.property('zip');
          response.body[0].zip.should.equal(80202);
          response.body[0].should.have.property('city');
          response.body[0].city.should.equal('Denver');
          response.body[0].should.have.property('state');
          response.body[0].state.should.equal('CO');
          response.body[0].should.have.property('phone');
          response.body[0].phone.should.equal('(303) 293-8555');
          response.body[0].should.have.property('website');
          response.body[0].website.should.equal('https://downtown.lodosbarandgrill.com/');
          response.body[0].should.have.property('monday');
          response.body[0].monday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('tuesday');
          response.body[0].tuesday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('wednesday');
          response.body[0].wednesday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('thursday');
          response.body[0].thursday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('friday');
          response.body[0].friday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('saturday');
          response.body[0].saturday.should.equal('3pm - 6pm');
          response.body[0].should.have.property('sunday');
          (response.body[0].sunday === null).should.be.true;
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
          response.body[0].description.should.equal('$3 select Breckenridge & Wynkoop beers');
          response.body[0].should.have.property('best_deal');
          response.body[0].best_deal.should.equal(true);
          response.body[0].should.have.property('restaurant_id');
          done();
        });
    });
  });

  describe('GET /api/v1/restaurants/:id', () => {
    it('should return all drink specials for a single restaurant matching the id passed as a param', done => {
      chai.request(server)
        .get('/api/v1/restaurants/5/drinks')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('description');
          response.body[0].description.should.equal('$3 select beers');
          response.body[0].should.have.property('best_deal');
          response.body[0].best_deal.should.equal(false);
          response.body[0].should.have.property('restaurant_id');
          response.body[0].restaurant_id.should.equal(5);
          response.body[1].should.have.property('id');
          response.body[1].should.have.property('description');
          response.body[1].description.should.equal('%50 bottles of wine');
          response.body[1].should.have.property('best_deal');
          response.body[1].best_deal.should.equal(true);
          response.body[1].should.have.property('restaurant_id');
          response.body[1].restaurant_id.should.equal(5);
          done();
        });
    });
  });

  describe('POST /api/v1/restaurants/:restaurant_id/drinks', () => {
    it('should add a drink special to a restaurant', done => {
      chai.request(server)
        .post('/api/v1/restaurants/1/drinks')
        .send({
          description: '$2 Vegas Bombs!',
          best_deal: true,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbUBnbWFpbC5jb20iLCJhcHBOYW1lIjoiQW5ncnkgQmlyZHMiLCJpYXQiOjE1MzE0MzUyMTUsImV4cCI6MTUzMTYwODAxNX0.ITmFfFCrENycfsVtDD7C0vgfhI4XwQTNiaNB4KybZqM',
          appName: 'BYOB'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(35);
          done();
        });
    });
  });

  describe('POST /api/v1/restaurants/', () => {
    it('should add a restaurant', done => {
      chai.request(server)
        .post('/api/v1/restaurants/')
        .send({
          name: 'Star Bar',
          address: '1235 20th St',
          zip: 80202,
          city: 'Denver',
          state: 'CO',
          phone: '(303) 743-3025',
          website: 'http://starbarndenver.com',
          monday: '10pm - close',
          tuesday: '10pm - close',
          wednesday: '10pm - close',
          thursday: '10pm - close',
          friday: '10pm - close',
          saturday: '10pm - close',
          sunday: '10pm - close',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbUBnbWFpbC5jb20iLCJhcHBOYW1lIjoiQW5ncnkgQmlyZHMiLCJpYXQiOjE1MzE0MzUyMTUsImV4cCI6MTUzMTYwODAxNX0.ITmFfFCrENycfsVtDD7C0vgfhI4XwQTNiaNB4KybZqM',
          appName: 'BYOB'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(21);
          done();
        });
    });
  });

  describe('DELETE /api/v1/restaurants/:id', () => {
    it('should delete a restaurant', done => {
      chai.request(server)
        .delete('/api/v1/restaurants/1')
        .send({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbUBnbWFpbC5jb20iLCJhcHBOYW1lIjoiQW5ncnkgQmlyZHMiLCJpYXQiOjE1MzE0MzUyMTUsImV4cCI6MTUzMTYwODAxNX0.ITmFfFCrENycfsVtDD7C0vgfhI4XwQTNiaNB4KybZqM",
          appName: "BYOB"
        })
        .end((err, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  describe('DELETE /api/v1/drinks/:id/', () => {
    it('should delete a restaurant', done => {
      chai.request(server)
        .delete('/api/v1/drinks/1/')
        .send({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbUBnbWFpbC5jb20iLCJhcHBOYW1lIjoiQW5ncnkgQmlyZHMiLCJpYXQiOjE1MzE0MzUyMTUsImV4cCI6MTUzMTYwODAxNX0.ITmFfFCrENycfsVtDD7C0vgfhI4XwQTNiaNB4KybZqM",
          appName: "BYOB"
        })
        .end((err, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          done();
        });
    });
  });
});