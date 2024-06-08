import database from '../config/Database.js';
import { WebToken, MobileToken } from '../helper/Token.js';
import md5 from 'md5';

export async function MLogout(username,device,token) {
    const updateToken = await database.query("UPDATE TOKENS SET EXPIRED_DATE = ? WHERE USERNAME = ? AND DEVICE = ? AND BINARY TOKEN = ?",
        [new Date(Date.now()), username, device, token]
    );

    return true;
}

export async function MLogin(username, password, device) {
    const [rows] = await database.query('SELECT PASSWORD AS USER FROM USER WHERE USERNAME = ?', [username]);

    if(rows.length === 0) {
        return {status: false};
    }

    if(rows[0].USER !== md5(password)) {
        return {status: false};
    }

    let token;

    if(device === 'mobile') {
        token = await MobileToken(username);
    }
    
    if(device === 'web') {
        token = await WebToken(username);
    }

    return {
        status: true,
        message: "Logged in successfully",
        token: token
    }
}