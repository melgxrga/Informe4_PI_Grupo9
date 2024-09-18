const db = require('../../DB/mysql');
const TABLA = 'publicaciones';

async function agregarPublicacion(data) {
    return db.agregar(TABLA, data);
}

async function obtenerPublicaciones(filtros) {
    let query = `SELECT p.*, c.nombre AS nombreCurso, cat.nombre AS nombreCatedratico, cat.apellido AS apellidoCatedratico
                 FROM ${TABLA} p
                 LEFT JOIN cursos c ON p.curso_id = c.id
                 LEFT JOIN catedraticos cat ON p.catedratico_id = cat.id
                 WHERE 1=1`;

    const params = [];

    if (filtros.cursoId) {
        query += ' AND p.curso_id = ?';
        params.push(filtros.cursoId);
    }

    if (filtros.catedraticoId) {
        query += ' AND p.catedratico_id = ?';
        params.push(filtros.catedraticoId);
    }

    if (filtros.nombreCurso) {
        query += ' AND c.nombre LIKE ?';
        params.push(`%${filtros.nombreCurso}%`);
    }

    if (filtros.nombreCatedratico) {
        query += ' AND (cat.nombre LIKE ? OR cat.apellido LIKE ?)';
        params.push(`%${filtros.nombreCatedratico}%`, `%${filtros.nombreCatedratico}%`);
    }

    return new Promise((resolve, reject) => {
        db.conmysql().query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function eliminarPublicacion(id) {
    return db.eliminar(TABLA, id);
}

module.exports = {
    agregarPublicacion,
    obtenerPublicaciones,
    eliminarPublicacion,
};