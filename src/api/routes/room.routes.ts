import { Router } from 'express';

import authorizeWithJwt from '../middlewares/auth/authorizeWithJwt';
import { RoomController } from '../controllers/room.controllers';

const router = Router();

router.use(authorizeWithJwt);

router.post('/rooms', RoomController.createRoom);

export default router;
