'use strict';

// Load environment variables defined at '.env' file
var conf = require('./conf/conf');
const WebSocket = require('ws');


var logger = require('./routes/utils/loggerfactory');

// Start websocket server
var wss = new WebSocket.Server({ port: conf.getWSPort() });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {
    logger.log('info', "WebSocket Server connection on: " + portWS, 'app.js', 'root');
    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});