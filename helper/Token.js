import database from '../config/Database.js';

export async function WebToken(email) {
    try {
        const [checkToken] = await database.query("SELECT email FROM TOKENS WHERE email = ? AND DEVICE = 'web'", [email]);
        
        const token = await tokenGenerator(100);
        const expired = new Date(Date.now() + 60 * 60 * 1000)
        
        if(checkToken.length === 0) {
            const insertToken = await database.query("INSERT INTO TOKENS(email,TOKEN,EXPIRED_DATE,DEVICE) VALUES(?,?,?,'web')",
                [email,token,expired]
            );
        }else {
            const updateToken = await database.query("UPDATE TOKENS SET TOKEN = ?, EXPIRED_DATE = ? WHERE email = ? AND DEVICE = 'web'",
                [token,expired,email]
            );
        }
    
        return token;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function MobileToken(email) {
    try {
        const [checkToken] = await database.query("SELECT email FROM TOKENS WHERE email = ? AND DEVICE = 'mobile'", [email]);
        
        const token = await tokenGenerator(100);
        const currentDate = new Date();
        const expired = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        
        if(checkToken.length === 0) {
            const insertToken = await database.query("INSERT INTO TOKENS(email,TOKEN,EXPIRED_DATE,DEVICE) VALUES(?,?,?,'mobile')",
                [email,token,expired]
            );
        }else {
            const updateToken = await database.query("UPDATE TOKENS SET TOKEN = ?, EXPIRED_DATE = ? WHERE email = ? AND DEVICE = 'mobile'",
                [token,expired,email]
            );
        }
    
        return token;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function tokenGenerator(length) {
    const strResult = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq!@#$%?~&-';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += strResult.charAt(Math.floor(Math.random() * strResult.length));
    }
    
    return result;
}