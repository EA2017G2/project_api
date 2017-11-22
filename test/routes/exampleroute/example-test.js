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
        server.server.close();
        mongoose.connection.close();
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    /*
    * Test the /GET route
    */
    describe('/GET root', function() {
        it('it should GET all the examples', function(done) {
            done();
        });
    });
});