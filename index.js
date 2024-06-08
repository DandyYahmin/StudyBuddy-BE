import express from 'express';
const app = express();
import router from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

app.use(express.json());
app.use(router);
app.use(cors({
    credentials: true,
    origin: '*',
    allowedHeaders: ['Content-Type']
}));

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log('listening on port ' + port));