import { body, validationResult } from "express-validator";
import database from '../config/Database.js';

export const TokenValidator = [
    body('username').not().isEmpty().withMessage('Missing username parameter'),
    body('token').not().isEmpty().withMessage('Missing token parameter')
        .isLength({ min: 100, max: 100 }).withMessage('Invalid token parameter expression'),
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

        const body = req.body;

        const [checkToken] = await database.query('SELECT EXPIRED_DATE AS EXPIRED FROM TOKENS WHERE USERNAME = ? AND BINARY TOKEN = ? AND DEVICE = ?',[
            body.username,
            body.token,
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
        return res.json({
            server_status: true,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
}