import { Router } from 'express';
import { AuthController } from '../controllers/auth.controllers';
import checkDuplicateEmailOrUserName from '../middlewares/auth/checkDuplicateEmailOrUserName';

const router = Router();

router.use(function (_req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post('/signUp', checkDuplicateEmailOrUserName, AuthController.signUp);

router.post('/signIn', AuthController.signIn);

export default router;
