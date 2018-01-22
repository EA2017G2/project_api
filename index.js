'use strict';

// Load environment variables defined at '.env' file
require('dotenv').config();
var app = require('./app');
var mongoose = require('mongoose');
var conf = require('./conf/conf');
require('./ws');


var logger = require('./routes/utils/loggerfactory');


// Load the configuration
conf.loadConfig();

// Start the server
var server = app.listen(conf.getExpressPort(), function () {
    logger.log('info', "Listening on port " + server.address().port, 'app.js', 'root');
});

// Start MongoDB connection
mongoose.connect(conf.getMongoUrl(), {
    useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', function () {
    logger.log('info', "Connected to the database...", 'app.js', 'root');
});