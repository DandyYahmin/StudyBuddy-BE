import database from '../config/Database.js';

export async function MDashboard(email) {
    try {
        const [name] = await database.query('SELECT name FROM USER WHERE EMAIL = ?', [email]);

        const [upcomingTask] = await database.query(
            `SELECT 
                DATE_FORMAT(deadline, "%d") AS tanggal, 
                DATE_FORMAT(deadline, "%M") AS bulan, 
                CONCAT("Deadline • ", DATE_FORMAT(deadline, "%H:%i")) AS deadline, 
                task AS tugas, 
                CASE
                    WHEN DATEDIFF(deadline, CURDATE()) = 0 THEN 'Today'
                    WHEN DATEDIFF(deadline, CURDATE()) < 0 THEN 'Late'
                    ELSE CONCAT(DATEDIFF(deadline, CURDATE()), ' days')
                END AS badge
            FROM TASK 
            WHERE email = ? AND status = "F" 
            ORDER BY TASK.deadline ASC`, [email]);

        return {
            name: name[0]?.name || '',
            upcoming_task: upcomingTask
        };

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}