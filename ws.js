'use strict';

// Load environment variables defined at '.env' file
var conf = require('./conf/conf');
const WebSocket = require('ws');


var ChatController = require('./controllers/chat');
var service = require('./service/index');
var logger = require('./routes/utils/loggerfactory');

// Start websocket server
var wss = new WebSocket.Server({
    port: conf.getWSPort(),
    // verifyClient: function (info, cb) {
    //     var token = info.req.headers.token;
    //     if (!token)
    //         cb(false, 401, 'Unauthorized');
    //     else {
    //         service.decodeToken(token).then(function (response) {
    //             info.req.user = response;
    //             cb(true)
    //         }).catch(function (response) {
    //             cb(false, response.status, response.message);
    //         });
    //     }
    // }
});

function heartbeat() {
    this.isAlive = true;
}

wss.on('connection', function connection(ws, req) {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    var firstMessage = true;

    ws.on('message', function incoming(message) {
        var parts = JSON.parse(message);
        if ((parts === null) || (parts.from === null) || parts.to === null) {
            ws.send('Format error');
        } else {
            if(firstMessage === true){
                ws.user = parts.author;
                firstMessage = false;
            }
            console.log('received: %s from %s for %s', parts.message, parts.author, parts.receiver);
            ChatController.addMessage(parts.author, parts.message, parts.receiver, function (err) {
                if(err !== null) {
                    logger.log('error', 'message can not be added to db', 'ws.js', 'root')
                }
                wss.clients.forEach(function each(client) {
                    if ((client.user === parts.receiver) && (client.readyState === WebSocket.OPEN)) {
                        client.send(message);
                    }
                });
            });
        }
    });

    ws.send(JSON.stringify({msgType: "0", from: "", message: "Connected!!!", to: ""}));
});

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping('', false, true);
    });
}, 30000);