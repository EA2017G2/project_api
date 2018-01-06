'use strict';

// Load environment variables defined at '.env' file
require('dotenv').config();


var logger = require('../routes/utils/loggerfactory');


var portWS = 8080;
var mongoURL = 'mongodb://localhost:27017/project_api';
var port = 3000;
var secretToken = 'G2loveshottt';


function loadConfig() {
    logger.log('info', "Trying to load config file", 'conf/conf.js', 'loadConfig');
    // WebSocket port
    var configPortWS = process.env.PORTWS;
    portWS = (configPortWS !== undefined ? configPortWS : 8080);
    logger.log('info', "Setup websocket port: " + portWS, 'conf/conf.js', 'loadConfig');
    // MongoDB URL
    var configMongoURL = process.env.MONGODB;
    mongoURL = (configMongoURL !== undefined ? configMongoURL : 'mongodb://localhost:27017/project_api');
    logger.log('info', "Setup mongo url: " + mongoURL, 'conf/conf.js', 'loadConfig');
    // Express port
    var configPort = process.env.PORT;
    port = (configPort !== undefined ? configPort : 3000);
    logger.log('info', "Setup express port: " + port, 'conf/conf.js', 'loadConfig');
    // Token
    var configSecretToken = process.env.SECRET_TOKEN;
    secretToken = (configSecretToken !== undefined ? configSecretToken : 'G2loveshottt');
}

function getWSPort() {
    return portWS;
}

function getExpressPort() {
    return port;
}

function getMongoUrl() {
    return mongoURL;
}

function getSecretToken() {
    return secretToken;
}


module.exports.loadConfig = loadConfig;
module.exports.getWSPort = getWSPort;
module.exports.getExpressPort = getExpressPort;
module.exports.getMongoUrl = getMongoUrl;
module.exports.getSecretToken = getSecretToken;