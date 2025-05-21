import express from 'express';
import { Login, LoginValidator, Logout } from '../controllers/AuthController.js';
// import { MandatoryValidator, Mandatory } from '../middleware/Validator.js';
import { TokenValidator, Token } from '../middleware/VerifyToken.js';
// import Log from '../middleware/Log.js';
import pkg from 'express-group-routes';
import { RegisterValidator, Register } from '../controllers/RegisterController.js';

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
        router.post('/test', (req, res) => {res.json(true);});
        router.post('/logout', Logout);
    });
});

export default router;