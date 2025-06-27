import { response } from 'express';
import database from '../config/Database.js';
import { WebToken, MobileToken } from '../helper/Token.js';
import md5 from 'md5';

export async function MUpdatePassword(email, oldPassword, newPassword) {
    try {
        const [rows] = await database.query('SELECT PASSWORD AS USER FROM USER WHERE email = ?', [email]);
    
        if(rows.length === 0 || rows[0].USER !== md5(oldPassword)) {
            return {
                status: false,
                message: 'Current password is incorrect',
                response: []
            };
        }
    
        await database.query('UPDATE USER SET PASSWORD = ? WHERE email = ?', [md5(newPassword), email]);
    
        return {
            status: true,
            message: 'Password updated successfully',
            response: []
        };

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MDeleteAccount(email, password) {
    try {
        const [rows] = await database.query('SELECT PASSWORD AS USER FROM USER WHERE email = ?', [email]);
    
        if(rows[0].USER !== md5(password)) {
            return {
                status: false,
                message: 'Password is incorrect',
                response: []
            };
        }
    
        await database.query('DELETE FROM TOKENS WHERE email = ?', [email]);
        await database.query('DELETE FROM TASK WHERE email = ?', [email]);
        await database.query('DELETE FROM USER WHERE email = ?', [email]);
    
        return {
            status: true,
            message: 'Account deleted successfully',
            response: []
        };

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MLogout(email,device) {
    try {
        const updateToken = await database.query("UPDATE TOKENS SET EXPIRED_DATE = ? WHERE email = ? AND DEVICE = ?",
            [new Date(Date.now()), email, device]
        );
    
        return {status: true};

    } catch (error) {
        console.error(error);
        return {status: false};
    }
}

export async function MLogin(email, password, device) {
    try {
        const [rows] = await database.query('SELECT PASSWORD AS USER FROM USER WHERE email = ?', [email]);
    
        if(rows.length === 0) {
            return {status: false};
        }
    
        if(rows[0].USER !== md5(password)) {
            return {status: false};
        }
    
        let token;
    
        if(device === 'mobile') {
            token = await MobileToken(email);
        }
        
        if(device === 'web') {
            token = await WebToken(email);
        }
    
        return {
            status: true,
            message: "Logged in successfully",
            response: [token]
        }
    } catch (error) {
        console.error(error);
        return {status: false};
    }
}