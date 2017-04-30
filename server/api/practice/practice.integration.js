'use strict';

var app = require('../..');
import request from 'supertest';

var newPractice;

describe('Practice API:', function() {

  describe('GET /api/practices', function() {
    var practices;

    beforeEach(function(done) {
      request(app)
        .get('/api/practices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          practices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      practices.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/practices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/practices')
        .send({
          name: 'New Practice',
          info: 'This is the brand new practice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPractice = res.body;
          done();
        });
    });

    it('should respond with the newly created practice', function() {
      newPractice.name.should.equal('New Practice');
      newPractice.info.should.equal('This is the brand new practice!!!');
    });

  });

  describe('GET /api/practices/:id', function() {
    var practice;

    beforeEach(function(done) {
      request(app)
        .get('/api/practices/' + newPractice._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          practice = res.body;
          done();
        });
    });

    afterEach(function() {
      practice = {};
    });

    it('should respond with the requested practice', function() {
      practice.name.should.equal('New Practice');
      practice.info.should.equal('This is the brand new practice!!!');
    });

  });

  describe('PUT /api/practices/:id', function() {
    var updatedPractice;

    beforeEach(function(done) {
      request(app)
        .put('/api/practices/' + newPractice._id)
        .send({
          name: 'Updated Practice',
          info: 'This is the updated practice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPractice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPractice = {};
    });

    it('should respond with the updated practice', function() {
      updatedPractice.name.should.equal('Updated Practice');
      updatedPractice.info.should.equal('This is the updated practice!!!');
    });

  });

  describe('DELETE /api/practices/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/practices/' + newPractice._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when practice does not exist', function(done) {
      request(app)
        .delete('/api/practices/' + newPractice._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
