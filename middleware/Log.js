import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.resolve(__dirname, '../app.log');

const Log = async (req, res, next) => {
    try {
        let responseBody = '';

        const originalSend = res.send;

        const date = new Date();
        const options = { timeZone: 'Asia/Jakarta' };
        const wibDate = new Date(date.toLocaleString('en-US', options));
        const pad = (n) => String(n).padStart(2, '0');
        const wibTime = `${pad(wibDate.getDate())}:${pad(wibDate.getMonth() + 1)}:${wibDate.getFullYear()} ${pad(wibDate.getSeconds())}:${pad(wibDate.getMinutes())}:${pad(wibDate.getHours())}`;

        res.send = function (body) {
            responseBody = body;

            const logMessage = {
                datetime: wibTime,
                endpoint: req.originalUrl,
                device: req.body.device || 'Unknown Device',
                email: req.body.email || 'Outsiders',
                token: req.body.token || 'Outsiders',
                response: responseBody
            };

            const logLine = JSON.stringify(logMessage) + '\n';

            setImmediate(() => {
                fs.appendFile(logPath, logLine, (err) => {
                    if (err) {
                        console.error(err);
                    } else {

                    }
                });
            })

            return originalSend.call(this, body);
        };

        next();

    } catch (error) {
        console.error(error);
        return res.json({
            server_status: false,
            server_message: 'StrikeOuts!',
            response: error
        });
    }
};

export default Log;