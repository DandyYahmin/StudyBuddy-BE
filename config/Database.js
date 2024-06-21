import mysql from 'mysql2';

const mysqli = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'authentication'
}).promise();

const database = mysqli;
export default database;