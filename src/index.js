const express = require('express');
const app = require('./app');
const clienteRutas = require('./modulos/usuarios/rutas');
const catedraticosRouter = require('./modulos/usuarios/catedraticosRutas');
const cursosRouter = require('./modulos/usuarios/cursosRutas');
const { setupDatabase } = require('./DB/dbSetup'); // Importar el script de configuración de la base de datos

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de clientes
app.use('/api', clienteRutas);
app.use('/api', catedraticosRouter);
app.use('/api', cursosRouter);

// Inicializar la base de datos y las tablas
setupDatabase().then(() => {
    console.log('Base de datos y tablas configuradas');

    // Iniciar el servidor después de configurar la base de datos
    app.listen(app.get('port'), () => {
        console.log(`Server en el puerto ${app.get('port')}`);
    });
}).catch((err) => {
    console.error('Error configurando la base de datos y tablas:', err);
});