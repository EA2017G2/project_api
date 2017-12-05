'use strict';

const express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');


//api.get('/product', productCtrl.getProducts)
router.post('/users/signup', userCtrl.signUp);
router.post('/users/signin', userCtrl.signIn);
router.post('/users/forgetPassword', userCtrl.forgetPassword);

router.get('/users', userCtrl.getUsers);
router.get('/users/profile', auth.isAuth, userCtrl.getProfile);
router.get('/private', auth.isAuth, function (req, res) {
    res.status(200).send({ message: 'tienes acceso' });
});

module.exports.router = router;