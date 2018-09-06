import express from 'express';
import userRegister from './userRegister'
import userLogin from './userLogin'

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);

export default router;
