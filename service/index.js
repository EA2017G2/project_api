'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
require('dotenv').config();
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

    var configSecretToken = process.env.SECRET_TOKEN;
    var secretToken = (configSecretToken !== undefined ? configSecretToken : 'G2loveshottt');
    return jwt.encode(payload, secretToken);
}

//iat=>fechaCreacion Token
//exp=>cuando expira
function decodeToken(token) {
    return new Promise(function (resolve, reject) {
        try {
            var configSecretToken = process.env.SECRET_TOKEN;
            var secretToken = (configSecretToken !== undefined ? configSecretToken : 'G2loveshottt');
            var payload = jwt.decode(token, secretToken);

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