const express = require('express');
const router = express.Router();
const controlador = require('./controlador');
const { setupDatabase } = require('../../DB/dbSetup');

// Inicializar la base de datos y la tabla
router.get('/init-db', async (req, res) => {
    try {
        await setupDatabase();
        res.send('Base de datos y tabla creadas o ya existen');
    } catch (err) {
        console.error('Error inicializando la base de datos:', err);
        res.status(500).send('Error inicializando la base de datos');
    }
});

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await controlador.todos();
        res.json(usuarios);
    } catch (err) {
        console.error('Error obteniendo los usuarios:', err);
        res.status(500).send('Error obteniendo los usuarios');
    }
});

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await controlador.uno(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error obteniendo el usuario:', err);
        res.status(500).send('Error obteniendo el usuario');
    }
});

// Agregar un nuevo usuario
router.post('/usuarios', async (req, res) => {
    try {
        const result = await controlador.agregar(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error agregando el usuario:', err);
        res.status(500).send('Error agregando el usuario');
    }
});

// Eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const result = await controlador.eliminar(req.params.id);
        if (result.affectedRows > 0) {
            res.send('Usuario eliminado');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error eliminando el usuario:', err);
        res.status(500).send('Error eliminando el usuario');
    }
});

// Recuperar contraseña
router.post('/usuarios/recuperar-contrasena', async (req, res) => {
    try {
        const { registroAcademico, correoElectronico, nuevaContrasena } = req.body;
        const result = await controlador.recuperarContrasena(registroAcademico, correoElectronico, nuevaContrasena);
        if (result) {
            res.send('Contraseña actualizada exitosamente');
        } else {
            res.status(400).send('Datos incorrectos');
        }
    } catch (err) {
        console.error('Error recuperando la contraseña:', err);
        res.status(500).send('Error recuperando la contraseña');
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    try {
        const { registroAcademico, contrasena } = req.body;
        const user = await controlador.login(registroAcademico, contrasena);
        if (user) {
            res.json({ message: 'Login exitoso', user });
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (err) {
        console.error('Error en el login:', err);
        res.status(500).send('Error en el login');
    }
});

module.exports = router;