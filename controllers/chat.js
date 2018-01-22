'use strict';

var User = require('../models/user');
var Contact = require('../models/contact');//Conversation
var Message = require('../models/message');


function addMessage(req, res) {
    var contact = new Contact({
        participants: req.user._id
    });
    contact.save(function (err) {
        if (err) {
            res.send({error: err});
            return next(err);
        }

        var message = new Message({
            conversationId: newConversation._id,
            body: req.body.body,
            author: req.user._id,
        });
        message.save(function (err) {
            if (err) {
                res.send({error: err});
                return next(err);
            }
            return res.status(200).json({message: 'Conversation started!', conversationId: conversation._id});

        });
    });
}

function getConversations(req, res) {
    // Only return one message from each conversation to display as snippet

    Contact.find({participants: req.user_id})
        .select('_id')
        .exec(function (err, conversations) {
            if (err) {
                res.send({error: err});
                return next(err);
            }

            // Set up empty array to hold conversations + most recent message
            const fullConversations = [];
            conversations.forEach(function (conversation) {
                Message.find({conversationId: conversation._id})
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: 'author',
                        select: 'email'
                    })
                    .exec(function (err, message) {
                        if (err) {
                            res.send({error: err});
                            return next(err);
                        }
                        fullConversations.push(message);
                        if (fullConversations.length === conversations.length) {
                            return res.status(200).json({conversations: fullConversations});
                        }
                    });
            });
        });
}