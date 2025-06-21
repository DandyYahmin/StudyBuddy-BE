import database from '../config/Database.js';

export async function MTask(email) {
        try {
        const [task] = await database.query(`
            SELECT 
                uuid as id, 
                DATE_FORMAT(deadline, "%d") AS tanggal, 
                DATE_FORMAT(deadline, "%m") AS bulan, 
                DATE_FORMAT(deadline, "%M") AS nama_bulan, 
                DATE_FORMAT(deadline, "%Y") AS tahun,
                CONCAT("Deadline: ", DATE_FORMAT(deadline, "%d %M"), ", ", DATE_FORMAT(deadline, "%H:%i")) AS deadline,
                CASE
                    WHEN status = 'T' THEN 'Done'
                    WHEN DATEDIFF(deadline, CURDATE()) = 0 THEN 'Today'
                    WHEN DATEDIFF(deadline, CURDATE()) < 0 THEN 'Late'
                    ELSE CONCAT(DATEDIFF(deadline, CURDATE()), ' days')
                END AS badge,
                task as tugas, 
                status
            FROM TASK 
            WHERE EMAIL = ?
            ORDER BY status, deadline`, 
        [email]);

        return {
            task: task
        };

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MAddTask(email, deadline, task) {
    try {
        const insertTask = await database.query('INSERT INTO TASK(EMAIL, DEADLINE, TASK) VALUES(?, ?, ?)', [email, deadline, task]);

        return {status: true};

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MCompleteTask(id, status) {
    try {
        const updateTask = await database.query('UPDATE TASK SET STATUS = ? WHERE UUID = ?', [status, id]);

        return {status: true};

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}