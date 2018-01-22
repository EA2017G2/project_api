'use strict';

var service = require('../service');


function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'No tienes autorizacion'});
    } else {
        var token = req.headers.authorization.split(" ")[1];
        service.decodeToken(token).then(function (response) {
            req.user = response;
            next();
        }).catch(function (response) {
            return res.status(response.status).send({message: response.message});
        });
    }
}

module.exports.isAuth = isAuth;