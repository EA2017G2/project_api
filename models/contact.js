/*
'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var ContactSchema = new mongoose.Schema({
    toUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    fromUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    signupDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Contacts', ContactSchema);
*/