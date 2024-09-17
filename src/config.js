require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'miapp',
    },
};