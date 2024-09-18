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

                    // Crear la tabla usuarios si no existe
                    const createUsuariosTableQuery = `
                        CREATE TABLE IF NOT EXISTS usuarios (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            registroAcademico VARCHAR(255) NOT NULL,
                            nombres VARCHAR(255) NOT NULL,
                            apellidos VARCHAR(255) NOT NULL,
                            contrasena VARCHAR(255) NOT NULL,
                            correoElectronico VARCHAR(255) NOT NULL
                        )
                    `;
                    connection.query(createUsuariosTableQuery, (err) => {
                        if (err) {
                            console.error('Error creando la tabla usuarios:', err.stack);
                            return reject(err);
                        }
                        console.log('Tabla usuarios creada o ya existe');

                        // Crear la tabla catedraticos si no existe
                        const createCatedraticosTableQuery = `
                            CREATE TABLE IF NOT EXISTS catedraticos (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                nombre VARCHAR(255) NOT NULL,
                                apellido VARCHAR(255) NOT NULL,
                                correoElectronico VARCHAR(255) NOT NULL
                            )
                        `;
                        connection.query(createCatedraticosTableQuery, (err) => {
                            if (err) {
                                console.error('Error creando la tabla catedraticos:', err.stack);
                                return reject(err);
                            }
                            console.log('Tabla catedraticos creada o ya existe');

                            // Crear la tabla cursos si no existe
                            const createCursosTableQuery = `
                                CREATE TABLE IF NOT EXISTS cursos (
                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                    nombre VARCHAR(255) NOT NULL,
                                    descripcion TEXT,
                                    catedratico_id INT,
                                    FOREIGN KEY (catedratico_id) REFERENCES catedraticos(id)
                                )
                            `;
                            connection.query(createCursosTableQuery, (err) => {
                                if (err) {
                                    console.error('Error creando la tabla cursos:', err.stack);
                                    return reject(err);
                                }
                                console.log('Tabla cursos creada o ya existe');

                                // Crear la tabla publicaciones si no existe
                                const createPublicacionesTableQuery = `
                                    CREATE TABLE IF NOT EXISTS publicaciones (
                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                        usuario_id INT NOT NULL,
                                        curso_id INT NOT NULL,
                                        catedratico_id INT, -- Permitir valores nulos si no es obligatorio
                                        tipo VARCHAR(255) NOT NULL, -- Puede ser 'Curso' o 'Catedrático'
                                        especifico VARCHAR(255) NOT NULL, -- Curso o nombre del catedrático
                                        mensaje TEXT NOT NULL,
                                        fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                                        FOREIGN KEY (curso_id) REFERENCES cursos(id),
                                        FOREIGN KEY (catedratico_id) REFERENCES catedraticos(id)
                                    )
                                `;
                                connection.query(createPublicacionesTableQuery, (err) => {
                                    if (err) {
                                        console.error('Error creando la tabla publicaciones:', err.stack);
                                        return reject(err);
                                    }
                                    console.log('Tabla publicaciones creada o ya existe');
                                    resolve();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = { setupDatabase };