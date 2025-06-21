import express from 'express';
import { Login, LoginValidator, Logout } from '../controllers/AuthController.js';
// import { MandatoryValidator, Mandatory } from '../middleware/Validator.js';
import { TokenValidator, Token } from '../middleware/VerifyToken.js';
// import Log from '../middleware/Log.js';
import pkg from 'express-group-routes';
import { RegisterValidator, Register } from '../controllers/RegisterController.js';
import { Biodata } from '../controllers/BiodataController.js';
import { Dashboard } from '../controllers/DashboardController.js';
import { Task, AddTask, AddTaskValidator, CompleteTask, CompleteTaskValidator } from '../controllers/TaskController.js';

const router = express.Router();

// create router get index
router.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

router.group('/api', router => {
    // router.use('/*', MandatoryValidator, Mandatory, Log);
    router.post('/register', RegisterValidator, Register); 
    router.post('/login', LoginValidator, Login);
    router.group('/vr', router => {
        router.use('/*', TokenValidator, Token);
        router.post('/test', (req, res) => {res.json({status: true});});
        router.post('/dashboard', Dashboard);
        router.post('/biodata', Biodata);
        router.group('/task', router => {
            router.post('/', Task);
            router.post('/add', AddTaskValidator, AddTask);
            router.post('/complete', CompleteTaskValidator, CompleteTask);
        });
        router.post('/logout', Logout);
    });
});

export default router;