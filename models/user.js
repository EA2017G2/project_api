'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs'); //libreria para encriptarcontraseñ

var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String },
    sex: String,
    orientation: String,
    city: String,
    locationCurrent: Number,
    connected: { type: Number, default: 0 },
    birthday: { type: Date , required: true},
    contacts: [{ type: mongoose.Schema.Types.Mixed, ref: 'Contacts' }],
    imageProfile: { data:Buffer, contentType:String},
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

UserSchema.pre('save', function (next) {
    var user = this;

    bcrypt.genSalt(10, function (err, salt) {
        user.salt = salt;
        if (err) {
            return next(err);
        } else {
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                } else {
                    user._doc.password = hash;
                    console.log(user.password);
                    next();
                }
            });
        }
    });
});

module.exports = mongoose.model('User', UserSchema);