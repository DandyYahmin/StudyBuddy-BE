import { MDashboard } from "../modules/DashboardModules.js";

export const Dashboard = async (req, res) => {
    try {
        const body = req.body;
        const modules = await MDashboard(body.email);

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