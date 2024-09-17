const express = require('express');
const config = require('./config');
const app = express();
const usuarios = require('./modulos/usuarios/rutas')
const catedraticos = require('./modulos/usuarios/catedraticosRutas')
const cursos = require('./modulos/usuarios/cursosRutas')
const publicaciones = require('./modulos/publicaciones/publicacionesRutas');

app.set('port', config.app.port);


app.use('/api/usuarios', usuarios)
app.use('/api/catedraticos', catedraticos)
app.use('/api/cursos', cursos)
app.use('/api/publicaciones', publicaciones);
module.exports = app;