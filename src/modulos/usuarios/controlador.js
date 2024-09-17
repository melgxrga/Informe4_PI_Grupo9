const db = require('../../DB/mysql');
const TABLA = 'usuarios'; // Cambiar a 'usuarios'

function todos() {
    return db.todos(TABLA);
}

function uno(id) {
    return db.uno(TABLA, id);
}

function agregar(data) {
    return db.agregar(TABLA, data);
}

function eliminar(id) {
    return db.eliminar(TABLA, id);
}

async function recuperarContrasena(registroAcademico, correoElectronico, nuevaContrasena) {
    const usuario = await db.buscarPorRegistroYCorreo(TABLA, registroAcademico, correoElectronico);
    if (usuario) {
        return db.actualizarContrasena(TABLA, usuario.id, nuevaContrasena);
    }
    return null;
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    recuperarContrasena,
};