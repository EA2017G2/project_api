'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
//const mongoose = require('mongoose')
//mongoose.Promise = require('bluebird')

function createToken (user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix(), 
        //notbefore..similar al iat
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}
//iat=>fechaCreacion Token
//exp=>cuando expira
function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)
        }catch(err){
            reject({
                status:500,
                message: 'Token invalido'
            })
        }
    })
    return decoded
}
module.exports = {
    createToken,
    decodeToken
}