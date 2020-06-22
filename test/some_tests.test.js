const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app');

describe('Unit testing the /task route', function () {

    it('should return OK status', function () {
        return request(app)
            .get('/task')
            .then(function (response) {
                assert.equal(response.status, 200)
            })
    });

    it('should return error for unsupported status Test', function () {
        return request(app)
            .put('/task/5ef09d8f2a80cd3b58d10cb0')
            .send({status: "Test"})
            .then(function (response) {
                assert.equal(response.status, 400)
            })
    });

    it('should return this task with new status Confirmed', function () {
        return request(app)
            .put('/task/5ef09d8f2a80cd3b58d10cb0')
            .send({status: "Confirmed"})
            .then(function (response) {
                expect(response.text).to.contain('"status":"Confirmed"');
            })
    });

    it('should return error for wrong taskId', function () {
        return request(app)
            .put('/task/0')
            .send({status: "Returned"})
            .then( function (response) {
                assert.equal(response.status, 400)
            })
    });
});



