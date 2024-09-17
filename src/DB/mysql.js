const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL con ID de conexión', connection.threadId);
});

function conmysql() {
    return connection;
}

function todos(tabla) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tabla}`;
        connection.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tabla} WHERE id = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tabla} SET ?`;
        connection.query(query, data, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE id = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

function buscarPorRegistroYCorreo(tabla, registroAcademico, correoElectronico) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tabla} WHERE registroAcademico = ? AND correoElectronico = ?`;
        connection.query(query, [registroAcademico, correoElectronico], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function actualizarContrasena(tabla, id, nuevaContrasena) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET contrasena = ? WHERE id = ?`;
        connection.query(query, [nuevaContrasena, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    conmysql,
    todos,
    uno,
    agregar,
    eliminar,
    buscarPorRegistroYCorreo,
    actualizarContrasena,
};