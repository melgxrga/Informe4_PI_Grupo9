const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password
});

function setupDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error conectando a MySQL:', err.stack);
                return reject(err);
            }
            console.log('Conectado a MySQL');

            // Crear la base de datos si no existe
            connection.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database}`, (err) => {
                if (err) {
                    console.error('Error creando la base de datos:', err.stack);
                    return reject(err);
                }
                console.log(`Base de datos ${config.db.database} creada o ya existe`);

                // Seleccionar la base de datos
                connection.query(`USE ${config.db.database}`, (err) => {
                    if (err) {
                        console.error('Error seleccionando la base de datos:', err.stack);
                        return reject(err);
                    }

                    // Crear la tabla si no existe
                    const createTableQuery = `
                        CREATE TABLE IF NOT EXISTS usuarios (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            registroAcademico VARCHAR(255) NOT NULL,
                            nombres VARCHAR(255) NOT NULL,
                            apellidos VARCHAR(255) NOT NULL,
                            contrasena VARCHAR(255) NOT NULL,
                            correoElectronico VARCHAR(255) NOT NULL
                        )
                    `;
                    connection.query(createTableQuery, (err) => {
                        if (err) {
                            console.error('Error creando la tabla:', err.stack);
                            return reject(err);
                        }
                        console.log('Tabla usuarios creada o ya existe');
                        resolve();
                    });
                });
            });
        });
    });
}

module.exports = { setupDatabase };