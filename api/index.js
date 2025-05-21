import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes/index.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*',
    allowedHeaders: ['Content-Type']
}));
app.use(router);

export const handler = serverless(app);
