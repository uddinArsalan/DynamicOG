import { Router } from 'express';
import {loginUser,registerUser,logout} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout', logout);
// router.post('/reset-password', resetPassword);

export default router;