'use strict';
const User = require('../models/user');
const mongoose = require('mongoose');
const service = require('../service');
const bcrypt = require('bcrypt-nodejs'); //libreria para encriptarcontraseñ


//funcion de registro
function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        sex: req.body.sex,
        city: req.body.city,
        birthday: req.body.birthday,   // solucionar error
        orientation: req.body.orientation,
        imageProfile: req.body.imageProfile
    });
    user.save((err) => {
        if (err) {
            return res.status(500).send({
                message: `Error al crear el usuario: ${err}`,
                message2: '1'
            });
        } else {
            return res.status(200).send({
                message2: 0,
                token: service.createToken(user)})
        }
    });
}

//funcion de autenticacion,una vez el user esta registrado
function signIn(req, res) {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err)
            return res.status(500).send({message: err});
        else if (!user)
            return res.status(404).send({message: 'No existe el usuario'});
        else {
            bcrypt.hash(req.body.password, user.salt, null, (err, hash) => {
                if (err) {
                    return res.status(503).send({message: 'Internal Error'});
                } else {
                    if(hash !== user.password) {
                        return res.status(404).send({message: 'Contraseña incorrecta'});
                    } else {
                        res.status(200).send({
                            message: 0,
                            hash: User.valueOf(user.password),
                            token: service.createToken(user)
                        });
                    }
                }
            });
        }
    })
}

function getUsers(req, res) {
    User.find({}, (err, products) => {
        if (err)
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        else if (!products)
            return res.status(404).send({message: `No existen productos`});
        else {
            for(let i = 0; i < products.length; i++) {
                products[i].password = "";
                products[i].salt = "";
            }
            res.json(products);
        }
    })
}

module.exports = {
    signUp,
    signIn,
    getUsers
};