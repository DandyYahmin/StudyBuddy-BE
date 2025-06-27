import database from '../config/Database.js';

export async function MProfile(email) {
    try {
        const [profile] = await database.query(`
            SELECT 
                USER.name,
                USER.email,
                COUNT(CASE WHEN TASK.deadline < CURDATE() AND TASK.status = 'F' THEN 1 ELSE NULL END) AS tugas_telat,
                COUNT(CASE WHEN TASK.status = 'T' THEN 1 ELSE NULL END) AS tugas_selesai,
                0 as group_chat
            FROM USER
            LEFT JOIN TASK ON USER.email = TASK.email
            WHERE USER.email = ?
            GROUP BY USER.name, USER.email
        `, [email]);

        return {
            profile: profile
        }
    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MEditProfile(email, name) {
    try {
        await database.query('UPDATE USER SET name = ? WHERE email = ?', [name, email]);
        return {status: true};
    } catch (error) {
        console.error(error);
        return {status: false};
    }
}