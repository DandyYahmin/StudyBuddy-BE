import { MDeleteAccount, MLogin, MLogout, MUpdatePassword } from "../modules/AuthModules.js";
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

export const DeleteAccountValidator = [
    body('password').not().isEmpty().withMessage('Missing password parameter')
];

export const UpdatePasswordValidator = [
    body('new_password').not().isEmpty().withMessage('Missing password parameter'),
    body('current_password').not().isEmpty().withMessage('Missing password parameter')
];

export const UpdatePassword = async(req, res) => {
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
        const modules = await MUpdatePassword(body.email, body.current_password, body.new_password); 
        
        return res.json(modules);

    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'StrikeOuts!',
            response: error
        });
    }
}

export const DeleteAccount = async(req, res) => {
    try {
        const body = req.body;
        const modules = await MDeleteAccount(body.email,body.password); 
        
        return res.json(modules);

    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'StrikeOuts!',
            response: error
        });
        
    }
}

export const Logout = async(req,res) => {
    try {
        const body = req.body;
        const modules = await MLogout(body.email,body.device); 
        
        if (modules.status == false) {
            return res.json({
                status: false,
                message: 'StrikeOuts!',
                response: 'Failed to Logout'
            });
        }

        return res.json({
            status: true,
            message: 'HomeRun!',
            response: {
                messages: 'Logged out successfully'
            }
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

export const Login = async(req,res) => {
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
        const modules = await MLogin(body.email, body.password, body.device); 
        
        if(modules.status == false) {
            return res.json({
                status: false,
                message: 'Email or Password is incorrect',
                response: []
            });
        }
        
        return res.json(modules);
        
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: 'StrikeOuts!',
            response: []
        });
    }
}