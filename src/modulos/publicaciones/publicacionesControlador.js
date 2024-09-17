const db = require('../../DB/mysql');
const TABLA = 'publicaciones';

function agregarPublicacion(data) {
    return db.agregar(TABLA, data);
}

function eliminarPublicacion(id) {
    const query = `DELETE FROM ${TABLA} WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.conmysql().query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

async function obtenerPublicaciones(filtros) {
    let query = `SELECT * FROM ${TABLA}`;
    let queryParams = [];
    let condiciones = [];

    // Aplicar los filtros si se proporcionan
    if (filtros.cursoId) {
        condiciones.push("curso_id = ?");
        queryParams.push(filtros.cursoId);
    }
    if (filtros.catedraticoId) {
        condiciones.push("catedratico_id = ?");
        queryParams.push(filtros.catedraticoId);
    }
    if (filtros.nombreCurso) {
        condiciones.push("curso_nombre LIKE ?");
        queryParams.push(`%${filtros.nombreCurso}%`);
    }
    if (filtros.nombreCatedratico) {
        condiciones.push("catedratico_nombre LIKE ?");
        queryParams.push(`%${filtros.nombreCatedratico}%`);
    }

    // Agregar condiciones a la consulta SQL
    if (condiciones.length > 0) {
        query += " WHERE " + condiciones.join(" AND ");
    }

    // Ordenar por fecha de creación (más recientes primero)
    query += " ORDER BY fecha_creacion DESC";

    return new Promise((resolve, reject) => {
        db.conmysql().query(query, queryParams, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

// Exportar ambas funciones
module.exports = {
    agregarPublicacion,
    obtenerPublicaciones,
    eliminarPublicacion
};
