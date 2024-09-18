const express = require('express');
const router = express.Router();
const publicacionesControlador = require('./publicacionesControlador');

// Crear una nueva publicación
router.post('/publicaciones', async (req, res) => {
    try {
        const { usuario_id, curso_id, catedratico_id, tipo, especifico, mensaje } = req.body;

        // Validación de campos requeridos
        if (!usuario_id || !curso_id || !tipo || !especifico || !mensaje) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const publicacion = {
            usuario_id,
            curso_id,
            catedratico_id, // Asegúrate de incluir catedratico_id
            tipo,
            especifico,
            mensaje
        };

        // Agregar la publicación a la base de datos
        const result = await publicacionesControlador.agregarPublicacion(publicacion);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error creando la publicación:', err);
        res.status(500).send('Error creando la publicación');
    }
});

// Ruta para obtener las publicaciones filtradas
router.get('/publicaciones', async (req, res) => {
    try {
        const filtros = {
            cursoId: req.query.cursoId,
            catedraticoId: req.query.catedraticoId,
            nombreCurso: req.query.nombreCurso,
            nombreCatedratico: req.query.nombreCatedratico
        };

        const publicaciones = await publicacionesControlador.obtenerPublicaciones(filtros);
        res.json(publicaciones);
    } catch (err) {
        console.error('Error obteniendo las publicaciones:', err);
        res.status(500).send('Error obteniendo las publicaciones');
    }
});

// Ruta para eliminar una publicación por ID
router.delete('/publicaciones/:id', async (req, res) => {
    try {
        const result = await publicacionesControlador.eliminarPublicacion(req.params.id);
        if (result.affectedRows > 0) {
            res.send('Publicación eliminada');
        } else {
            res.status(404).send('Publicación no encontrada');
        }
    } catch (err) {
        console.error('Error eliminando la publicación:', err);
        res.status(500).send('Error eliminando la publicación');
    }
});

module.exports = router;