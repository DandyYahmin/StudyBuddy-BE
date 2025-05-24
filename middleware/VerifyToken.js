import { body, validationResult } from "express-validator";
import database from '../config/Database.js';

export const TokenValidator = [
    body('email').not().isEmpty().withMessage('Missing email parameter'),
    body('device').not().isEmpty().withMessage('Missing device parameter').isIn(['web', 'mobile']).withMessage('Device must be either web or mobile')
];

export const Token = async (req,res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                status: false,
                message: 'StrikeOuts!',
                response: errors.array().map(error => error.msg)
            });
        }

        const authHeader = req.headers['authorization'];
    
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7, authHeader.length);
            req.token = token;
        } else {
            return res.json({
                status: false,
                message: 'StrikeOuts!',
                response: ['Invalid token']
            });
        }

        const body = req.body;

        const [checkToken] = await database.query('SELECT EXPIRED_DATE AS EXPIRED FROM TOKENS WHERE EMAIL = ? AND BINARY TOKEN = ? AND DEVICE = ?',[
            body.email,
            req.token,
            body.device
        ]);
        
        if(checkToken.length === 0 || new Date(checkToken[0].EXPIRED) <= new Date()) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: {
                    message: 'Invalid access token'
                }
            });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.json({
            server_status: true,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
}