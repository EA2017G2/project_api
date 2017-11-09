'use strict'
const User = require('../models/user')
const mongoose = require('mongoose')
const service = require('../service')
const bcrypt = require('bcrypt-nodejs') //libreria para encriptarcontraseñ


//funcion de registro
function signUp (req, res) {
const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    sex: req.body.sex,
    city: req.body.city,
    birthday: req.body.birthday,
    orientation: req.body.orientation,
    imageProfile: req.body.imageProfile
})
user.save((err) => {
    if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
//service =>función
    return res.status(200).send({ token: service.createToken(user) })
})
}
//funcion de autenticacion,una vez el user esta registrado
function signIn (req,res){
  //  const pass = req.body.password
    User.find({ email: req.body.email, password: req.body.password }, (err, user) => {
     if(err) return res.status(500).send({ message: err})
     if(!user)
        return res.status(404).send({message: 'No existe el usuario'})
    res.status(200).send({
        message: 'te has logueado correctamente',
        hash: User.valueOf(user.password),
        token: service.createToken(user)
    })

})
}
function getUsers(req, res){
 User.find({}, (err, products) => {
           if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
           if (!products) return res.status(404).send({message:`No existen productos` })
   
           res.json(products)
           
       })
   }   

module.exports = {
    signUp,
    signIn,
    getUsers
}