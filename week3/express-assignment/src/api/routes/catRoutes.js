import express from 'express';
import multer from 'multer';
import { body, param } from 'express-validator';
import { handleValidation } from '../../middlewares/validation.js';
import { getCats, getCatById, postCat, putCat, deleteCat, getCatsByUser } from '../controllers/catController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getCats);
router.get('/:id', [param('id').isInt().toInt(), handleValidation], getCatById);

router.post(
	'/',
	upload.single('file'),
	[body('name').notEmpty().withMessage('name is required'), body('weight').optional().isFloat(), body('owner').optional().isInt(), body('birthdate').optional().isISO8601()],
	handleValidation,
	postCat
);

router.put('/:id', [param('id').isInt().toInt(), body('weight').optional().isFloat(), handleValidation], putCat);
router.delete('/:id', [param('id').isInt().toInt(), handleValidation], deleteCat);

router.get('/user/:userId', [param('userId').isInt().toInt(), handleValidation], getCatsByUser);

export default router;
