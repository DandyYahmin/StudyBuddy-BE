import express from 'express';
import { DeleteAccount, DeleteAccountValidator, Login, LoginValidator, Logout, UpdatePassword, UpdatePasswordValidator } from '../controllers/AuthController.js';
// import { MandatoryValidator, Mandatory } from '../middleware/Validator.js';
import { TokenValidator, Token } from '../middleware/VerifyToken.js';
// import Log from '../middleware/Log.js';
import pkg from 'express-group-routes';
import { RegisterValidator, Register } from '../controllers/RegisterController.js';
import { Dashboard } from '../controllers/DashboardController.js';
import { Task, AddTask, AddTaskValidator, CompleteTask, CompleteTaskValidator, DeleteTask, DeleteTaskValidator } from '../controllers/TaskController.js';
import { EditProfile, EditProfileValidator, Profile } from '../controllers/ProfileController.js';
import { CreateGroup, CreateGroupValidator, Group, HistoryGroup, HistoryGroupValidator, JoinGroup, JoinGroupValidator } from '../controllers/GroupController.js';

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
        router.group('/task', router => {
            router.post('/', Task);
            router.post('/add', AddTaskValidator, AddTask);
            router.post('/complete', CompleteTaskValidator, CompleteTask);
            router.post('/delete', DeleteTaskValidator, DeleteTask);
        });
        router.group('/profile', router => {
            router.post('/', Profile)
            router.post('/edit', EditProfileValidator, EditProfile);
        });
        router.group('/group', router => {
            router.post('/', Group);
            router.post('/create', CreateGroupValidator, CreateGroup);
            router.post('/join', JoinGroupValidator, JoinGroup);
            router.post('/history', HistoryGroupValidator, HistoryGroup);
        })
        router.post('/delete-account', DeleteAccountValidator, DeleteAccount);
        router.post('/change-password', UpdatePasswordValidator, UpdatePassword);
        router.post('/logout', Logout);
    });
});

export default router;