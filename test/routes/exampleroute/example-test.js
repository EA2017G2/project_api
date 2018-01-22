'use strict';

var mongoose = require("mongoose");

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../app');
var logger = require('../../../routes/utils/loggerfactory');
var conf = require('../../../conf/conf');
var server = null;
var should = chai.should();

chai.use(chaiHttp);

describe('Example Route TEST', function () {
    before(function () {
        // runs before all tests in this block
        server = app.listen(conf.getExpressPort(), function () {
            logger.log('info', "Listening on port " + server.address().port, 'app.js', 'root');
        });
    });

    after(function () {
        // runs after all tests in this block
        server.close();
        //mongoose.connection.close();
    });

    beforeEach(function () {
        // runs before each test in this block
    });

    afterEach(function () {
        // runs after each test in this block
    });

    /*
    * Test GET /private bad access route
    */
    describe('GET /private', function () {
        it('it should GET bad auth with 403', function (done) {
            chai.request(server).get('/api/private')
                .end(function (err, res) {
                    res.should.have.status(403);
                    res.body.should.have.property('message').eql('No tienes autorizacion');
                    done();
                });
        });
    });
});