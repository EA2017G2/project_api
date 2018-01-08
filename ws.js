'use strict';

// Load environment variables defined at '.env' file
var conf = require('./conf/conf');
const WebSocket = require('ws');


var service = require('./service/index');
var logger = require('./routes/utils/loggerfactory');

// Start websocket server
var wss = new WebSocket.Server({
    port: conf.getWSPort(),
    verifyClient: function (info, cb) {
        var token = info.req.headers.token;
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
    ws.user = req.user;


    ws.on('message', function incoming(message) {
        var parts = message.split(':');
        if((parts.length !== 3) || (parts[0] !== req.user.name)) {
            ws.send('Format error');
        } else {
            console.log('received: %s from %s for %s', parts[1], parts[0], parts[2]);
            var isConnected = false;
            var fromUser = part[0];
            req.user.contacts.push(fromUser);
            wss.clients.forEach(function each(client) {
                if((client.user.name === parts[2]) && (client.readyState === WebSocket.OPEN)) {
                    var answer = parts[0] + ':' + parts[1];
                    isConnected = true;
                    client.send(answer);
                    //var toUser = part[2];
                    user.contacts.push(client);
                }
            });
            // Delivery if not connected??
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