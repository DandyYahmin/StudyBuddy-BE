import { MCreateGroup, MGroup, MHistoryGroup, MJoinGroup } from "../modules/GroupModules.js";
import { body, validationResult } from "express-validator";

export const Group = async (req, res) => {
    try {
        const body = req.body;
        const modules = await MGroup(body.email);

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

export const HistoryGroupValidator = [
    body('groupid').not().isEmpty().withMessage('Missing groupid parameter')
];
export const HistoryGroup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: false, message: 'StrikeOuts!', response: errors.array().map(e => e.msg) });
        }

        const { groupid } = req.body;
        const modules = await MHistoryGroup(groupid);

        return res.json({
            status: true,
            message: 'Successfully retrieved history',
            response: modules
        });

    } catch (error) {
        console.error(error);
        return res.json({ status: false, message: 'StrikeOuts!', response: error });
    }
}

export const JoinGroupValidator = [
    body('groupid').not().isEmpty().withMessage('Missing group_id parameter'),
];
export const JoinGroup = async (req, res) => {
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
        const modules = await MJoinGroup(body.email, body.groupid);

        return res.json({
            status: true,
            message: `Successfully joined group with ID ${body.groupid}`,
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

export const CreateGroupValidator = [
    body('name').not().isEmpty().withMessage('Missing name parameter')
];
export const CreateGroup = async (req, res) => {
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
        const modules = await MCreateGroup(body.email, body.name, body.description);

        return res.json({
            status: true,
            message: `Successfully create group`,
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

