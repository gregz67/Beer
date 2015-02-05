/**
 *
 */
var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('assert');
var app = require('../app');
var request = require('supertest');

describe('Test Framework', function() {
  it('should have mocha installed and running.', function() {
    assert.equal(true, true);
  })
  it('should have the should library installed and running for fluent testing.', function() {
    true.should.eql(true);
  })
});

describe('App', function() {

  describe('GET /users', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  });

});
