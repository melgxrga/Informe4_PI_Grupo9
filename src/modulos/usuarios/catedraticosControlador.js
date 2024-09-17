const db = require('../../DB/mysql');
const TABLA = 'catedraticos';

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

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
};