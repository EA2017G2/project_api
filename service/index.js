'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
//const mongoose = require('mongoose')
//mongoose.Promise = require('bluebird')

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
        //notbefore..similar al iat
    };

    return jwt.encode(payload, config.SECRET_TOKEN);
}

//iat=>fechaCreacion Token
//exp=>cuando expira
function decodeToken(token) {
    return new Promise(function (resolve, reject) {
        try {
            var payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            resolve(payload.sub);
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