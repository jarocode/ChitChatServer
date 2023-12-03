import { NextFunction, Request, Response } from 'express';

import { models } from '../models';
import { tryCatch } from '../utils/error.utils';

const getUsers = tryCatch(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.id;
    const users = await models.user
      .find({ _id: { $ne: userId } })
      .select('-password')
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      data: users,
      message: 'users retrieved successfully'
    });
  }
);

export const UserController = {
  getUsers
};
