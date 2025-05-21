import database from '../config/Database.js';
import md5 from "md5";

export async function MRegister(email, password, name) {
    try {
        const [rows] = await database.query('SELECT email FROM USER WHERE EMAIL = ?', [email]);
    
        if(rows.length !== 0) {
            return {status: false};
        }
    
        const insertUser = await database.query('INSERT INTO USER(EMAIL,PASSWORD,NAME) VALUES(?,?,?)', [email, md5(password), name]);

        return {status: true};
        
    } catch (error) {
        console.log(error);
        return {status: false};
    }
}