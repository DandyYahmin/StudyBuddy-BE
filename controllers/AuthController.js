import { MLogin, MLogout } from "../modules/AuthModules.js";
import { body, validationResult } from "express-validator";

export const LoginValidator = [
    body('username').not().isEmpty().withMessage('Missing username parameter'),
    body('password').not().isEmpty().withMessage('Missing password parameter')
];

export const Logout = async(req,res) => {
    try {
        const body = req.body;
        const modules = await MLogout(body.username,body.device,body.token); 
        
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
        const modules = await MLogin(body.username, body.password, body.device); 
        
        if(modules.status == false) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: {
                    message: 'Username or Password is incorrect'
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