import database from '../config/Database.js';

export async function MBiodata(email) {
    try {
        const [rows] = await database.query('SELECT name FROM USER WHERE EMAIL = ?', [email]);

        return rows;

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}