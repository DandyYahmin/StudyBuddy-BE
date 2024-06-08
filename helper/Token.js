import database from '../config/Database.js';

export async function WebToken(username) {
    try {
        const [checkToken] = await database.query("SELECT USERNAME FROM TOKENS WHERE USERNAME = ? AND DEVICE = 'web'", [username]);
        
        const token = await tokenGenerator(100);
        const expired = new Date(Date.now() + 60 * 60 * 1000)
        
        if(checkToken.length === 0) {
            const insertToken = await database.query("INSERT INTO TOKENS(USERNAME,TOKEN,EXPIRED_DATE,DEVICE) VALUES(?,?,?,'web')",
                [username,token,expired]
            );
        }else {
            const updateToken = await database.query("UPDATE TOKENS SET TOKEN = ?, EXPIRED_DATE = ? WHERE USERNAME = ? AND DEVICE = 'web'",
                [token,expired,username]
            );
        }
    
        return token;
    } catch (error) {
        return error;
    }
}

export async function MobileToken(username) {
    try {
        const [checkToken] = await database.query("SELECT USERNAME FROM TOKENS WHERE USERNAME = ? AND DEVICE = 'mobile'", [username]);
        
        const token = await tokenGenerator(100);
        const currentDate = new Date();
        const expired = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        
        if(checkToken.length === 0) {
            const insertToken = await database.query("INSERT INTO TOKENS(USERNAME,TOKEN,EXPIRED_DATE,DEVICE) VALUES(?,?,?,'mobile')",
                [username,token,expired]
            );
        }else {
            const updateToken = await database.query("UPDATE TOKENS SET TOKEN = ?, EXPIRED_DATE = ? WHERE USERNAME = ? AND DEVICE = 'mobile'",
                [token,expired,username]
            );
        }
    
        return token;
    } catch (error) {
        return error;
    }
}

async function tokenGenerator(length) {
    const strResult = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += strResult.charAt(Math.floor(Math.random() * strResult.length));
    }
    
    return result;
}