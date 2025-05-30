import { MBiodata } from "../modules/BiodataModules.js";

export const Biodata = async (req, res) => {
    try {
        const body = req.body;
        const modules = await MBiodata(body.email);

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