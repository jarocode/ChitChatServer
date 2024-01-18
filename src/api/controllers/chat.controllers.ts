import { NextFunction, Request, Response } from 'express';

import { models } from '../models';
import { tryCatch } from '../utils/error.utils';

const sendChat = tryCatch(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { message, room_id } = req.body;
    const user_id = req.user?.id;

    const newChat = new models.chat({
      user_id,
      room_id,
      message
    });

    const chat = await newChat.save();

    res.status(200).json({
      success: true,
      data: chat,
      message: 'chat sent successfully'
    });
  }
);

export const ChatController = {
  sendChat
};
