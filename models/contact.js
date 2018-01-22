'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// " ConversationSchema "
var ContactSchema = new mongoose.Schema({
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    // signupDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Contacts', ContactSchema);