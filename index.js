'use strict';
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise
const app = require('./app');
//const autoIncrement = require('mongoose-auto-increment')

const config = require('./config');

//mongoose.Promise = bluebird
mongoose.connect(config.db, (err, res) => {
    if (err) {
        console.log(`Error al conectar con base de datos: ${err}`);
        process.exit(1);
    } else {
        console.log('Conexión a la base de datos establecida...');
    }
    //autoIncrement.initialize(connection)
});

app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`);
});