import log from "../config/Log.js";

const Log = async (req,res,next) => {
    try {
        let response = '';

        const originalSend = res.send

        res.send = function(body) {
            response = body;
    
            originalSend.call(this, body);
        };

        res.on('finish', async () => {
            const insert = new log({
                service: process.env.SERVICE,
                username: req.body.username || 'Outsiders',
                device: req.body.device,
                token: req.body.token || 'Outsiders',
                datetime: new Date(),
                endpoint: req.originalUrl,
                response: response
            });

            const exec = await insert.save();
        });

        next();

    } catch (error) {
        return res.json({
            server_status: false,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
}

export default Log;