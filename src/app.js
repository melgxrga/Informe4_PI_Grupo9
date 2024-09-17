const express = require('express');
const config = require('./config');
const app = express();
const usuarios = require('./modulos/usuarios/rutas')
app.set('port', config.app.port);


app.use('/api/usuarios', usuarios)
module.exports = app;