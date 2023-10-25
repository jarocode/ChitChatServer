import { NextFunction, Request, Response, Router, } from 'express';
import * as Auth from './../middlewares/auth.middleware';

const router = Router();

router
  .route('/')
  .post(
    Auth.authorize(['signin']),
  )