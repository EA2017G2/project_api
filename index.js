'use strict'
const mongoose = require('mongoose')
//mongoose.Promise = global.Promise
const app = require('./app')
//const autoIncrement = require('mongoose-auto-increment')

const config = require('./config')

//mongoose.Promise = bluebird
mongoose.connect(config.db, (err, res) => {
  if (err){
    return console.log(`Error al conectar con base de datos: ${err}`)
  }
  console.log('Conexión a la base de atos establecida...')
 //autoIncrement.initialize(connection)
  app.listen(config.port, () =>{
     console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})