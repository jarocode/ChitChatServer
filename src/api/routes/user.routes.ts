import { Router } from 'express';

import authorizeWithJwt from '../middlewares/auth/authorizeWithJwt';
import { UserController } from '../controllers/user.controllers';

const router = Router();

router.use(authorizeWithJwt);

router.get('/users', UserController.getUsers);
// router.get('/users', (req, res) => {
//   res.send('hello world!');
// });

export default router;
