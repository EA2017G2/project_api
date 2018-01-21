'use strict';

const express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');


//api.get('/product', productCtrl.getProducts)
router.post('/users/signup', userCtrl.signUp);
router.post('/users/signin', userCtrl.signIn);
router.put('/users/update/:userName',auth.isAuth, userCtrl.updateUsername);
router.put('/users/update/:userCity',auth.isAuth, userCtrl.updateCity);
router.post('/users/forgetPassword', userCtrl.forgetPassword);
//router.post('/users/addPic', auth.isAuth, userCtrl.addPic);
router.post('/users/filter', auth.isAuth, userCtrl.filter);
router.post('/users/settings', auth.isAuth, userCtrl.settings);
router.post('/users/updateUsername', auth.isAuth, userCtrl.updateUsername);
router.post('/users/updateCity', auth.isAuth, userCtrl.updateCity);
router.post('/users/updatePassword', auth.isAuth, userCtrl.updatePassword);
router.get('/users', userCtrl.getUsers);
router.get('/users/profile', auth.isAuth, userCtrl.getProfile);
router.get('/users/getByType', userCtrl.getByType);
router.get('/private', auth.isAuth, function (req, res) {
    res.status(200).send({ message: 'tienes acceso' });
});

module.exports.router = router;