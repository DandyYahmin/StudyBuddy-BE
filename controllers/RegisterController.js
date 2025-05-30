import { body, validationResult } from "express-validator";
import { MRegister } from "../modules/RegisterModules.js";
import { MLogin } from "../modules/AuthModules.js";

export const RegisterValidator = [
    body('email').not().isEmpty().withMessage('Missing email parameter'),
    body('password').not().isEmpty().withMessage('Missing password parameter'),
    body('name').not().isEmpty().withMessage('Missing name parameter'),
    body('device').not().isEmpty().withMessage('Missing device parameter').isIn(['web', 'mobile']).withMessage('Device must be either web or mobile')
];

export const Register = async(req,res) => {
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
        const modules = await MRegister(body.email, body.password, body.name); 
        
        if(modules.status == false) {
            return res.json({
                status: false,
                message: 'Aww email is taken',
                response: []
            });
        }

        const login = await MLogin(body.email, body.password, body.device);

        return res.json({
            status: true,
            message: `${body.email} successfully registered to server`,
            response: [
                login.response[0]
            ]
        });
        
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'StrikeOuts!',
            response: error
        });
    }
}