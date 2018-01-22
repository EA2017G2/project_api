var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var MessageSchema = new mongoose.Schema({
        conversationId: {
            type: mongoose.Schema.Types.ObjectId
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        body: {
            type: String,
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

module.exports = mongoose.model('Message', MessageSchema);