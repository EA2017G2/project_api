'use strict';

const express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');


//api.get('/product', productCtrl.getProducts)
router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);
router.post('/forgetPassword', userCtrl.forgetPassword);
router.get('/getUsers', userCtrl.getUsers);
router.get('/private', auth.isAuth, function (req, res) {
    res.status(200).send({ message: 'tienes acceso' });
});

module.exports.router = router;