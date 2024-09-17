import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadFileController } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', upload.single('optionalImage'), uploadFileController);

export default router;
