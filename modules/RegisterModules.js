import database from '../config/Database.js';
import md5 from "md5";

export async function MRegister(username, password) {
    const [rows] = await database.query('SELECT USERNAME FROM USER WHERE USERNAME = ?', [username]);

    if(rows.length !== 0) {
        return {status: false};
    }

    const insertUser = await database.query('INSERT INTO USER(USERNAME,PASSWORD) VALUES(?,?)', [username, md5(password)]);

    return {status: true};
}