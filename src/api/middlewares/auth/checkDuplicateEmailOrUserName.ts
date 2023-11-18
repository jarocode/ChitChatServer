import { Request, Response, NextFunction } from 'express';

import { models } from '../../models';
import { AppError, tryCatch } from '../../utils/error.utils';

const checkDuplicateEmailOrUserName = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username } = req.body;
    const existingUserWithUsername = await models.user
      .findOne({ username })
      .exec();
    const existingUserWithEmail = await models.user.findOne({ email }).exec();

    if (existingUserWithUsername)
      return next(new AppError('Failed! Username is already in use!', 400));
    if (existingUserWithEmail)
      return next(new AppError('Failed! Email is already in use!', 400));
    next();
  }
);

export default checkDuplicateEmailOrUserName;
