'use strict';

var Message = require('../models/message');


function addMessage(author, messageBody, receiver, callback) {
    var message = new Message({
        body: messageBody,
        author: author,
        receiver: receiver
    });
    message.save(function (err) {
        callback(err);
    });
}

function getContacts(author, callback) {
    Message.find({author: author}).distinct('receiver', function (error, contacts) {
        callback(error, contacts);
    });
}

function getConversations(author, callback) {
    Message.find({author: author})
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'email'
        })
        .populate({
            path: 'receiver',
            select: 'name'
        })
        .exec(function (err, messages) {
            callback(err, messages);
        });
}

module.exports.addMessage = addMessage;
module.exports.getContacts = getContacts;
module.exports.getConversations = getConversations;