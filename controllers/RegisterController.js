import { body, validationResult } from "express-validator";
import { MRegister } from "../modules/RegisterModules.js";

export const RegisterValidator = [
    body('email').not().isEmpty().withMessage('Missing email parameter'),
    body('password').not().isEmpty().withMessage('Missing password parameter'),
    body('name').not().isEmpty().withMessage('Missing name parameter')
];

export const Register = async(req,res) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: errors.array().map(error => error.msg)
            });
        }

        const body = req.body;
        const modules = await MRegister(body.email, body.password, body.name); 
        
        if(modules.status == false) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: {
                    message: 'Aww email is taken'
                }
            });
        }

        return res.json({
            server_status: true,
            server_message: 'HomeRun!',
            response: {
                message: `${body.email} is successfully registered to server`
            }
        });
        
    } catch (error) {
        return res.json({
            server_status: false,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
}