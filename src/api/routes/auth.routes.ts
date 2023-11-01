import { Router } from 'express';
import { AuthController } from '../controllers/auth.controllers';
import checkDuplicateEmailOrUserName from '../middlewares/auth/checkDuplicateEmailOrUserName';

const router = Router();

router.post('/signUp', checkDuplicateEmailOrUserName, AuthController.signUp);

router.post('/signIn', AuthController.signIn);

export default router;
