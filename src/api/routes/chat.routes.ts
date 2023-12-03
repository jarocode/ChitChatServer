import { Router } from 'express';

import { ChatController } from '../controllers/chat.controllers';
import authorizeWithJwt from '../middlewares/auth/authorizeWithJwt';

const router = Router();

router.use(authorizeWithJwt);

router.post('/chats', ChatController.sendChat);

export default router;
