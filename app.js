'use strict';

// Load environment variables defined at '.env' file
require('dotenv').config();
var path = require("path");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compression = require('compression');
var cors = require('cors');


var middlewareLoggerTimestamp = require('./middlewares/middlewareLoggerTimestamp');
var router = require('./routes/index');
var logger = require('./routes/utils/loggerfactory');


// Enable transport compression
app.use(compression());

// Enable Logging Express
app.use(logger.getExpressLogger());

// Setup a global middleware example
app.use(middlewareLoggerTimestamp.loggerTimestampMiddleware);

// Serve static assets from the app folder. This enables things like javascript
// and stylesheets to be loaded as expected. Analog to nginx.
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse application/json
app.use(bodyParser.json());

// enables them to specify the verb on header 'X-HTTP-Method-Override'
app.use(methodOverride('X-HTTP-Method-Override'));

// Setup app routes
app.use('/api', router.router);


module.exports = app;