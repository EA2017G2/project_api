'use strict';

// Load environment variables defined at '.env' file
var conf = require('./conf/conf');
var jwt = require('jwt-simple');
const WebSocket = require('ws');


var service = require('./service/index');
var logger = require('./routes/utils/loggerfactory');

// Start websocket server
var wss = new WebSocket.Server({
    port: conf.getWSPort(),
    verifyClient: function (info, cb) {
        var token = info.req.headers.token;
        token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTUxNTJmNzkyZmZiZjI2NTAzZTI2YjkiLCJpYXQiOjE1MTUyNzkwOTYsImV4cCI6MTUxNTM2NTQ5NiwibmFtZSI6IjJhIiwiZW1haWwiOiJhM0BhLmNvbSJ9.qMpDg9e-2rby_kOQdS-GBQ1YsrBXyhRvUVh3lyTPgtw";
        if (!token)
            cb(false, 401, 'Unauthorized');
        else {
            service.decodeToken(token).then(function (response) {
                info.req.user = response;
                cb(true)
            }).catch(function (response) {
                cb(false, response.status, response.message);
            });
        }
    }
});

function heartbeat() {
    this.isAlive = true;
}

wss.on('connection', function connection(ws, req) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    ws.on('message', function incoming(message) {
        var parts = message.split(':');
        if(parts.length !== 3) {
            ws.send('Format error');
        } else {
            console.log('received: %s from %s', message, req.user.sub);
            ws.send(req.user.sub);
        }
    });

    ws.send('Connected!!!');
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping('', false, true);
    });
}, 30000);