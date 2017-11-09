'use strict'

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //libreria para encriptarcontraseñ

const UserSchema = new Schema({
    email: {type: String, unique:true, lowercase:true, required: true },
    name: { type: String, required: true },
    password: { type: String, select: false, required: true},
    sex: String,
    orientation: String,
    city: String,
    locationCurrent: Number,
    connected: {type: Number, default: 0 },
    birthday: { type: String  },  //Date tendria que ser
    contacts: {type: Number },
    imageProfile: { type: String },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})
//funcion de moongose q se ejecuta antes de guardar la contraseña
UserSchema.pre('save', (next) => {
    let user = this
    //if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err) 

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err)

            user.password = hash
            console.log(user.password)
            next()
        })
    })
})
module.exports = mongoose.model('User', UserSchema )