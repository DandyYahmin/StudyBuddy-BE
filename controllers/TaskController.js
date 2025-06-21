import { MTask, MAddTask, MCompleteTask } from "../modules/TaskModules.js";
import { body, validationResult } from "express-validator";
import moment from 'moment';

export const AddTaskValidator = [
    body('task').not().isEmpty().withMessage('Missing task parameter'),
    body('deadline')
        .notEmpty()
        .withMessage('Missing deadline parameter')
        .custom((value) => {
            const isValid = moment(value, 'YYYY-MM-DD HH:mm:00', true).isValid();
            if (!isValid) {
                throw new Error('Deadline must be in the format "yyyy-MM-dd HH:mm:00"');
            }
            return true;
        }),
];

export const CompleteTaskValidator = [
    body('id').not().isEmpty().withMessage('Missing id parameter'),
    body('status').not().isEmpty().withMessage('Missing status parameter').isIn(['T', 'F']).withMessage('Status must be either T (true) or F (false)')
]

export const CompleteTask = async (req, res) => {
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
        const modules = await MCompleteTask(body.id, body.status);

        return res.json({
            status: true,
            message: `Successfully update task`,
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

export const AddTask = async (req, res) => {
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
        const modules = await MAddTask(body.email, body.deadline, body.task);

        return res.json({
            status: true,
            message: `Successfully add task`,
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

export const Task = async (req, res) => {
        try {
            const body = req.body;
            const modules = await MTask(body.email);
    
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