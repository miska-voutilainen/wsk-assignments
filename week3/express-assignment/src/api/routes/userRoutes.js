import express from 'express';
import { body, param } from 'express-validator';
import { handleValidation } from '../../middlewares/validation.js';
import { getUsers, getUserById, postUser, putUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', [param('id').isInt().toInt(), handleValidation], getUserById);
router.post('/', [body('name').notEmpty(), body('username').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })], handleValidation, postUser);
router.put('/:id', [param('id').isInt().toInt(), body('email').optional().isEmail()], handleValidation, putUser);
router.delete('/:id', [param('id').isInt().toInt(), handleValidation], deleteUser);

export default router;
