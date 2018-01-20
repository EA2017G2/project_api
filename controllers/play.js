'use strict';

var User = require('../models/user');
var Contact = require('../models/contact');
var service = require('../service');
var logger = require('../routes/utils/loggerfactory');




function getRandom(req,res) {

    var list = [];
    var  aleatorio= null;
    User.find({}, function (err, users) {
        if (err) return res.status(500).send({message: 'Error al realizar la peticion: ' + err});
        else if (!users) return res.status(404).send({message: 'No existen usuarios'});
        else {
            for (var i = 0; i < users.length; i++) {
                users[i].password = "";
                users[i].salt = "";
                list.push(users[i].name);
            }
           // console.log(list);
            for (var j = 0; j < list.length; j++) {
             aleatorio = list[Math.floor(Math.random()* list.length)];
            }
           // console.log(aleatorio);
            res.json(aleatorio);
        }
    });



}
module.exports.getRandom = getRandom;
