import { Router } from 'express';

import authorizeWithJwt from '../middlewares/auth/authorizeWithJwt';
import { UserController } from '../controllers/user.controllers';

const router = Router();

router.use(authorizeWithJwt);

router.get('/users', UserController.getUsers);

export default router;
