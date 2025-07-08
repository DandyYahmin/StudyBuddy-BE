import database from '../config/Database.js';
import { customAlphabet } from 'nanoid';

export async function MGroup(email) {
    try {
        const [group] = await database.query(`
            WITH member_count AS (
                SELECT 
                    group_id, 
                    COUNT(*) as total_members
                FROM GROUPMEMBERS
                GROUP BY group_id
            )
            SELECT 
                cg.id AS id,
                cg.name,
                cg.description,
                mc.total_members AS member
            FROM GROUPMEMBERS gm
            JOIN CHATGROUPS cg ON gm.group_id = cg.id
            LEFT JOIN member_count mc ON gm.group_id = mc.group_id
            WHERE gm.user_email = ?
            ORDER BY cg.created_at DESC;
        `, [email]);

        return {
            group: group
        }
    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6);

async function generateUniqueGroupId() {
    let groupId;
    let isUnique = false;
    while (!isUnique) {
        groupId = nanoid();
        const [rows] = await database.query('SELECT id FROM CHATGROUPS WHERE id = ?', [groupId]);
        if (rows.length === 0) {
            isUnique = true;
        }
    }
    return groupId;
}

export async function MCreateGroup(email, name, description) {
    try {
        const groupId = await generateUniqueGroupId();

        const [result] = await database.query(`
            INSERT INTO CHATGROUPS (id, name, description, creator_email, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `, [groupId, name, description, email]);

        if (result.affectedRows > 0) {
            await database.query(`
                INSERT INTO GROUPMEMBERS (user_email, group_id, role)
                VALUES (?, ?, 'admin')
            `, [email, groupId]);
        }

        return {status: true};
    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MJoinGroup(email, groupId) {
    try {
        const [rows] = await database.query('SELECT user_email FROM GROUPMEMBERS WHERE user_email = ? AND group_id = ?', [email,groupId]);
        if (rows.length > 0) {
            return {status: true};
        }

        const [result] = await database.query(`
            INSERT INTO GROUPMEMBERS (user_email, group_id)
            VALUES (?, ?)
        `, [email, groupId]);

        return {status: true};
    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MHistoryGroup(groupId) {
    try {
        const [messages] = await database.query(`
            SELECT 
                m.sender_email AS senderEmail,
                u.name AS senderName,
                m.content,
                m.sent_at AS sentAt
            FROM MESSAGES m
            JOIN USER u ON m.sender_email = u.email
            WHERE m.group_id = ?
            ORDER BY m.sent_at ASC;
        `, [groupId]);

        return {
            messages: messages
        }
    } catch (error) {
        console.error("Error fetching group history:", error);
        return { messages: [] }; // Kembalikan array kosong jika error
    }
}