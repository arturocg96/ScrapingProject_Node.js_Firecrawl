const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,         
    user: process.env.DB_USER,         
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,     
    port: process.env.DB_PORT,         
};


module.exports.connect = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);       
        return connection; 
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        throw error; 
    }
};
