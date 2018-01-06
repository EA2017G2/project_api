'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var conf = require('../conf/conf');
//const mongoose = require('mongoose')
//mongoose.Promise = require('bluebird')


function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix(),
        name: user.name,
        email: user.email
        //notbefore..similar al iat
    };

    return jwt.encode(payload, conf.getSecretToken(), null, null);
}

//iat=>fechaCreacion Token
//exp=>cuando expira
function decodeToken(token) {
    return new Promise(function (resolve, reject) {
        try {
            var payload = jwt.decode(token, conf.getSecretToken(), false, null);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            resolve(payload);
        } catch (err) {
            reject({
                status: 500,
                message: 'Token invalido'
            });
        }
    });
}

module.exports.createToken = createToken;
module.exports.decodeToken = decodeToken;