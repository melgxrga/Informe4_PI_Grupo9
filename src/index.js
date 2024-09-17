const express = require('express');
const app = require('./app');
const clienteRutas = require('./modulos/usuarios/rutas');

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de clientes
app.use('/api', clienteRutas);

app.listen(app.get('port'), () => {
    console.log(`Server en el puerto ${app.get('port')}`);
});