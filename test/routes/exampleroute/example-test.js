'use strict';

var mongoose = require("mongoose");

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Example Route TEST', function() {
    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
        server.server.close();
        mongoose.connection.close();
        process.exit(0);
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    /*
    * Test GET /private bad access route
    */
    describe('GET /private', function() {
        it('it should GET bad auth with 403', function(done) {
            chai.request(server.server).get('/api/private')
                .end(function(err, res) {
                    res.should.have.status(403);
                    done();
                });
        });
    });
});