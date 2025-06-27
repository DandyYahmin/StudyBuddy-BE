import { MProfile, MEditProfile } from "../modules/ProfileModule.js";
import { body, validationResult } from "express-validator";

export const Profile = async (req, res) => {
        try {
            const body = req.body;
            const modules = await MProfile(body.email);
    
            return res.json({
                status: true,
                message: `Successfully retrieved data`,
                response: modules
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

export const EditProfileValidator = [
    body('name').not().isEmpty().withMessage('Missing name parameter')
];
export const EditProfile = async (req, res) => {
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
        const modules = await MEditProfile(body.email, body.name);

        return res.json({
            status: true,
            message: `Successfully update data`,
            response: []
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