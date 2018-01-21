'use strict';

var User = require('../models/user');
var Contact = require('../models/contact');
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

// Crea mensajes
function newMessage(req,res){
    var contact = new Contact({
        toUserId: req.body._id,
        fromUserId: req.body._id,
        comment: req.body.comment
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
function updateUsername(req, res) {
    var userId = req.user.sub;
    var update = req.body;
    console.log(req.body);

    User.findOneAndUpdate({_id: userId}, { $set: { name : req.params.userName}}, { new: true }, function (err, userUpdated) {
        if (err)
            return res.status(500).send({message: err});
        else if (!userUpdated)
            return res.status(404).send({message: 'No existe ese producto'});
        else {
            console.log(userUpdated);
            return res.status(200).send({user:userUpdated});
        }
    })
}
function updateCity(req, res) {
    var userId = req.user.sub;
    var update = req.body;
    console.log('user',req.body);

    User.findOneAndUpdate({_id: userId}, { $set: { city : req.body.city}}, { new: true }, function (err, userUpdated) {
        if (err)
            return res.status(500).send({message: err});
        else if (!userUpdated)
            return res.status(404).send({message: 'No existe ese producto'});
        else {
            console.log('userUpdate:',userUpdated);
            return res.status(200).send({user:userUpdated});
        }
    })
}
function updatePassword(req, res) {
    var userId = req.user.sub;
    var update = req.body;
    console.log('user',req.body);

    User.findOneAndUpdate({_id: userId}, { $set: { city : req.body.password}}, { new: true }, function (err, userUpdated) {
        if (err)
            return res.status(500).send({message: err});
        else if (!userUpdated)
            return res.status(404).send({message: 'No existe ese producto'});
        else {
            console.log('userUpdate:',userUpdated);
            return res.status(200).send({user:userUpdated});
        }
    })
}

function getProfile(req, res){ 
    var userId = req.user.sub;
    User.find({ _id: userId }, function(err,user) {
        if(err)
            return res.status(500).send({message: err});
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            console.log(user);
          return res.status(200).send(user);
        }
    })
}
/*
function addPic(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var imageProfile = req.body;
    User.update({ _id: userId }, {$set: {imageProfile: imageProfile}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, imageProfile changed");
        }
    })
}
*/

function filter(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var orientation = req.body.orientation;

    User.update({ _id: userId }, {$set: {orientation: orientation}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, settings changed");
        }
    })
    console.log(orientation);
}

function updateUsername(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var username = req.body.username;

    User.update({ _id: userId }, {$set: {name: username}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, settings changed");
        }
    })
    console.log(username);
}

function updateCity(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var city = req.body.city;

    User.update({ _id: userId }, {$set: {city: city}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, settings changed");
        }
    })
    console.log(city);
}

function updatePassword(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var password = req.body.password;

    User.update({ _id: userId }, {$set: {password: password}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, settings changed");
        }
    })
    console.log(password);
}

function settings(req, res){
    console.log("hello");
    var userId = req.user.sub;
    var username = req.body.username;
    var city = req.body.city;
    var pass1 = req.body.pass1;

    User.update({ _id: userId }, {$set: {name: username, city: city}}, function(err,user) {
        if(err){
            console.log(err);
            return res.status(500).send({message: err});}
        else if (!user)
            return res.status(404).send({message: 'El usuario no existe'});
        else{
            return res.status(200).send("OK, settings changed");
        }
    });

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

function getByType(req, res) {
    User.find({ sex: req.params.id}, function(err, user) {
        if (err) return res.status(500).send({ message: err });else if (!user) return res.status(404).send({ message: 'No existe el usuario' });else {
            //     bcrypt.hash(req.body.password, user.salt, null, function (err, hash) {
            //          if (err) {
            //           return res.status(503).send({ message: 'Internal Error' });
            //         } else {
            res.status(200).send({
                message: user
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
module.exports.updateCity = updateCity;
module.exports.updateUsername = updateUsername;
module.exports.getProfile = getProfile;
//module.exports.addPic = addPic ;
module.exports.getByType = getByType;
module.exports.getUsers = getUsers;
module.exports.forgetPassword = forgetPassword;
module.exports.filter = filter;
module.exports.settings = settings;
module.exports.updateUsername = updateUsername;
module.exports.updateCity = updateCity;
module.exports.updatePassword = updatePassword;