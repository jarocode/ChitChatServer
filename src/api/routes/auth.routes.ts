import { Router, Request, Response } from 'express';

const router = Router();

router.use(function (_req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post('/signUp', (req: Request, res: Response) => {});

router.post('/signIn', (req: Request, res: Response) => {
  res.status(200).json('signedIn successfully');
});

export default router;
