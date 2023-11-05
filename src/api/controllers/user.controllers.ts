import { Request, Response } from 'express';

import { models } from '../models';

const getUsers = async (req: Request, res: Response) => {
  try {
    // console.log('userId', req.user?.id);
    const userId = req.user?.id;
    const users = await models.user
      .find({ _id: { $ne: userId } })
      .select('-password')
      .lean()
      .exec();
    console.log('users', users);
    res.status(200).json({
      success: true,
      data: users,
      message: 'users retrieved successfully'
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
};

export const UserController = {
  getUsers
};
