import { MTask } from "../modules/TaskModules.js";

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