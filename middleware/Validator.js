import { body, validationResult } from "express-validator";

export const MandatoryValidator = [
    body('device').not().isEmpty().withMessage('Unknown error')
        .isIn(['web', 'mobile']).withMessage('Unknown error'),
    body('signature').not().isEmpty().withMessage('Unknown error')
];

export const Mandatory = async (req,res,next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                server_status: true,
                server_message: 'StrikeOuts!',
                response: errors.array().map(error => error.msg)
            });
        }

        if(req.body.signature !== process.env.SERVER_SIGNATURE) {
            return res.json({
                server_status: true,
                server_message: 'StrikeOuts!',
                response: ['Unknown error']
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