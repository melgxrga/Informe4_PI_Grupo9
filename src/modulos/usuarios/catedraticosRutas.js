const express = require('express');
const router = express.Router();
const controlador = require('./catedraticosControlador');

// Obtener todos los catedráticos
router.get('/catedraticos', async (req, res) => {
    try {
        const catedraticos = await controlador.todos();
        res.json(catedraticos);
    } catch (err) {
        console.error('Error obteniendo los catedráticos:', err);
        res.status(500).send('Error obteniendo los catedráticos');
    }
});

// Obtener un catedrático por ID
router.get('/catedraticos/:id', async (req, res) => {
    try {
        const catedratico = await controlador.uno(req.params.id);
        if (catedratico) {
            res.json(catedratico);
        } else {
            res.status(404).send('Catedrático no encontrado');
        }
    } catch (err) {
        console.error('Error obteniendo el catedrático:', err);
        res.status(500).send('Error obteniendo el catedrático');
    }
});

// Agregar un nuevo catedrático
router.post('/catedraticos', async (req, res) => {
    try {
        const result = await controlador.agregar(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error agregando el catedrático:', err);
        res.status(500).send('Error agregando el catedrático');
    }
});

// Eliminar un catedrático por ID
router.delete('/catedraticos/:id', async (req, res) => {
    try {
        const result = await controlador.eliminar(req.params.id);
        if (result.affectedRows > 0) {
            res.send('Catedrático eliminado');
        } else {
            res.status(404).send('Catedrático no encontrado');
        }
    } catch (err) {
        console.error('Error eliminando el catedrático:', err);
        res.status(500).send('Error eliminando el catedrático');
    }
});

module.exports = router;