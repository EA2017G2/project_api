'use strict';

var User = require('../models/user');
var Contact = require('../models/contact');
var service = require('../service');
var logger = require('../routes/utils/loggerfactory');




function getRandom(req,res) {
    var orientation="";
    var userName = req.user.name;

    var list = [];
    var  aleatorio= null;

    var id= req.user.sub;
    User.findById(id, function(err,user){
        console.log(user);
        orientation= user.orientation;
    } );

    console.log(userName);
    if(orientation=="both"){

        User.find({}, function (err, users) {
        if (err) return res.status(500).send({message: 'Error al realizar la peticion: ' + err});
        else if (!users) return res.status(404).send({message: 'No existen usuarios'});
        else {
            for (var i = 0; i < users.length; i++) {
                users[i].password = "";
                users[i].salt = "";
                list.push(users[i].name);
            }
            var index = list.indexOf(userName);
            if (index !== -1) {
                list.splice(index,1);
            }
            console.log('list sin sofia:',list);

            for (var j = 0; j < list.length; j++) {
                aleatorio = list[Math.floor(Math.random() * list.length)];

            }
            // console.log(list);
            res.json(aleatorio);
        }
    });}
    else {

        User.find({sex: orientation}, function (err, users) {
            if (err) return res.status(500).send({message: 'Error al realizar la peticion: ' + err});
            else if (!users) return res.status(404).send({message: 'No existen usuarios'});
            else {
                for (var i = 0; i < users.length; i++) {
                    users[i].password = "";
                    users[i].salt = "";
                    list.push(users[i].name);
                }
                var index = list.indexOf(userName);
                if (index !== -1) {
                    list.splice(index, 1);
                }
                console.log('list sin sofia:', list);

                for (var j = 0; j < list.length; j++) {
                    aleatorio = list[Math.floor(Math.random() * list.length)];

                }
                // console.log(list);
                res.json(aleatorio);
            }
        });
    }



}
module.exports.getRandom = getRandom;
