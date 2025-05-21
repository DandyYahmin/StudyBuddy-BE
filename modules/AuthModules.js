import database from '../config/Database.js';
import { WebToken, MobileToken } from '../helper/Token.js';
import md5 from 'md5';

export async function MLogout(email,device) {
    try {
        const updateToken = await database.query("UPDATE TOKENS SET EXPIRED_DATE = ? WHERE email = ? AND DEVICE = ?",
            [new Date(Date.now()), email, device]
        );
    
        return {status: true};

    } catch (error) {
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
            token: token
        }
    } catch (error) {
        return {status: false};
    }
}