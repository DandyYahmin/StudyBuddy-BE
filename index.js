import express from 'express';
const app = express();
import router from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import os from 'os';
import Log from './middleware/Log.js';
import { Server } from 'socket.io';
import initializeSocket from './socket/index.js';
import http from 'http';

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

app.use(express.json());
app.use(Log);
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(router);
initializeSocket(io);

function getWiFiIP() {
    const interfaces = os.networkInterfaces();

    const wifiNames = ['Wi-Fi', 'wlan0', 'en0'];
    for (const name of wifiNames) {
        const iface = interfaces[name];
        if (!iface) continue;

        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }

    return 'localhost';
}

const port = process.env.SERVER_PORT || 3000;
const wifiIP = getWiFiIP();

httpServer.listen(port, () => {
    console.log(`✅ Server is running at:`);
    console.log(`   - Local:   http://localhost:${port}`);
    console.log(`   - Wi-Fi:   http://${wifiIP}:${port}`);
});