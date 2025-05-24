import { body, header, validationResult } from "express-validator";

export const MandatoryValidator = [
    body('device').not().isEmpty().withMessage('Unknown error')
        .isIn(['web', 'mobile']).withMessage('Unknown error'),
    header('signature').not().isEmpty().withMessage('Unknown error')
];

export const Mandatory = async (req,res,next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: errors.array().map(error => error.msg)
            });
        }

        const signature = req.headers.signature

        if(signature !== process.env.SERVER_SIGNATURE) {
            return res.json({
                server_status: false,
                server_message: 'StrikeOuts!',
                response: ['Unknown error']
            });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.json({
            server_status: false,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
}