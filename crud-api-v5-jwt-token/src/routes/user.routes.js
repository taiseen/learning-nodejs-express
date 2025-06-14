import { login, logout, registration } from '../controllers/user.controllers.js';
import express from 'express';

const router = express.Router();


router.post('/register', registration);

router.post('/login', login);

router.post('/logout', logout);


export default router;