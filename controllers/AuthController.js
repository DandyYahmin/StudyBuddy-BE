import { MLogin, MLogout } from "../modules/AuthModules.js";
import { body, validationResult } from "express-validator";

export const LoginValidator = [
    body('email').not().isEmpty().withMessage('Missing email parameter'),
    body('password').not().isEmpty().withMessage('Missing password parameter'),
    body('device').not().isEmpty().withMessage('Missing device parameter').isIn(['web', 'mobile']).withMessage('Device must be either web or mobile')
];

export const LogoutValidator = [
    body('email').not().isEmpty().withMessage('Missing email parameter'),
    body('device').not().isEmpty().withMessage('Missing device parameter').isIn(['web', 'mobile']).withMessage('Device must be either web or mobile')
];

export const Logout = async(req,res) => {
    try {
        const body = req.body;
        const modules = await MLogout(body.email,body.device); 
        
        if (modules.status == false) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: 'Failed to Logout'
            });
        }

        return res.json({
            server_status: true,
            server_message: 'HomeRun!',
            response: {
                messages: 'Logged out successfully'
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

export const Login = async(req,res) => {
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
        const modules = await MLogin(body.email, body.password, body.device); 
        
        if(modules.status == false) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: {
                    message: 'email or Password is incorrect'
                }
            });
        }

        return res.json({
            server_status: true,
            server_message: 'HomeRun!',
            response: modules
        });
        
    } catch (error) {
        return res.json({
            server_status: false,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
}