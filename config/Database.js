import mysql from 'mysql2';

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'authentication'
}).promise();

export default database;