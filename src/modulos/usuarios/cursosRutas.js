const express = require('express');
const router = express.Router();
const controlador = require('./cursosControlador');

// Obtener todos los cursos
router.get('/cursos', async (req, res) => {
    try {
        const cursos = await controlador.todos();
        res.json(cursos);
    } catch (err) {
        console.error('Error obteniendo los cursos:', err);
        res.status(500).send('Error obteniendo los cursos');
    }
});

// Obtener un curso por ID
router.get('/cursos/:id', async (req, res) => {
    try {
        const curso = await controlador.uno(req.params.id);
        if (curso) {
            res.json(curso);
        } else {
            res.status(404).send('Curso no encontrado');
        }
    } catch (err) {
        console.error('Error obteniendo el curso:', err);
        res.status(500).send('Error obteniendo el curso');
    }
});

// Agregar un nuevo curso
router.post('/cursos', async (req, res) => {
    try {
        const result = await controlador.agregar(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error agregando el curso:', err);
        res.status(500).send('Error agregando el curso');
    }
});

// Eliminar un curso por ID
router.delete('/cursos/:id', async (req, res) => {
    try {
        const result = await controlador.eliminar(req.params.id);
        if (result.affectedRows > 0) {
            res.send('Curso eliminado');
        } else {
            res.status(404).send('Curso no encontrado');
        }
    } catch (err) {
        console.error('Error eliminando el curso:', err);
        res.status(500).send('Error eliminando el curso');
    }
});

module.exports = router;