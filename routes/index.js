'use strict'

const express = require('express')
const productCtrl = require('../controllers/user')
const auth = require('../middelwares/auth')
const userCtrl = require('../controllers/user')
const api = express.Router()


//api.get('/product', productCtrl.getProducts)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/getUsers', userCtrl.getUsers)
api.get('/private', auth, (req, res) => {
 res.status(200).send({ message: 'tienes acceso'})
})

module.exports = api