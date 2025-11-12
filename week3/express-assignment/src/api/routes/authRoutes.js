import express from 'express';
import { body } from 'express-validator';
import { postLogin, getMe } from '../controllers/authController.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { handleValidation } from '../../middlewares/validation.js';

const router = express.Router();

router.post('/login', [body('username').notEmpty(), body('password').notEmpty()], handleValidation, postLogin);
router.get('/me', authenticateToken, getMe);

export default router;
