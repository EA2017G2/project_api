'use strict';

var User = require('../models/user');
var service = require('../service');
var bcrypt = require('bcrypt-nodejs'); //libreria para encriptarcontraseñ
var email = require('emailjs/email');
var logger = require('../routes/utils/loggerfactory');

//funcion de registro
function signUp(req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        sex: req.body.sex,
        city: req.body.city,
        birthday: req.body.birthday, // solucionar error
        orientation: req.body.orientation,
        imageProfile: req.body.imageProfile
    });

    logger.log("info", "user: " + user, "controller/user.js", "signUp");

    user.save(function (err) {
        if (err) {
            return res.status(500).send({
                message: 'Error al crear el usuario: ' + err
            });
        } else {
            return res.status(200).send({
                token: service.createToken(user)
            });
        }
    });
}

//funcion de autenticacion,una vez el user esta registrado
function signIn(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send({ message: err });else if (!user) return res.status(404).send({ message: 'No existe el usuario' });else {
            bcrypt.hash(req.body.password, user.salt, null, function (err, hash) {
                if (err) {
                    return res.status(503).send({ message: 'Internal Error' });
                } else {
                    if (hash !== user.password) {
                        return res.status(404).send({ message: 'Contraseña incorrecta' });
                    } else {
                        res.status(200).send({
                            hash: User.valueOf(user.password), // TODO: Debe mandarse hash??
                            token: service.createToken(user)
                        });
                    }
                }
            });
        }
    });
}

function getProfile(req, res){
    var userId = req.user.sub;
    User.find({ _id: userId }, function(err,user) {
        if(err)
            return res.status(500).send({message: err});
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
          req.user = user;
          res.status(200).send(user);
        }
    })
}

function getUsers(req, res) {
    User.find({}, function (err, products) {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion: ' + err });else if (!products) return res.status(404).send({ message: 'No existen productos' });else {
            for (var i = 0; i < products.length; i++) {
                products[i].password = "";
                products[i].salt = "";
            }
            res.json(products);
        }
    });
}

function forgetPassword(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send({ message: err });else if (!user) return res.status(404).send({ message: 'No existe el usuario' });else {
        //     bcrypt.hash(req.body.password, user.salt, null, function (err, hash) {
        //          if (err) {
        //           return res.status(503).send({ message: 'Internal Error' });
        //         } else {
                   sendmail(req.body.email,user.password);
                        res.status(200).send({
                            message: 'Consulte su correo electrónico.'
           });
        }
    });
}

function sendmail(mail, password) {
    logger.log("info", "test send mail function", "controller/user.js", "sendmail");
    var server  = email.server.connect({
        user:    "loveshotrecovery@outlook.es",
        password:"loveShot_",
        host:    "smtp-mail.outlook.com",
        tls: {ciphers: "SSLv3"}
    });

    // send the message and get a callback with an error or details of the message that was sent
    var message = {
        text:    "Hello, your password is: " + password,
        from:    "me <loveshotrecovery@outlook.es>",
        to:      "xavi <" + mail + ">",
        subject: "Welcome to my app",
        attachment:
            [
                {data:"<html>Hello, your password is </html>" + password, alternative:true}
            ]
    };
    server.send(message, function(err, message) {
        if (err !== null) {
            logger.log("error", err, "controller/user.js", "sendmail");
        } else {
            logger.log("info", message, "controller/user.js", "sendmail");
        }
    });
}

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.getProfile = getProfile;
module.exports.getUsers = getUsers;
module.exports.forgetPassword = forgetPassword;