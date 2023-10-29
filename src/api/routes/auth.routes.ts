import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controllers';

const router = Router();

router.use(function (_req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post('/signUp', AuthController.signUp);

router.post('/signIn', (req: Request, res: Response) => {
  res.status(200).json('signedIn successfully');
});

export default router;
