import { NextFunction, Request, Response } from 'express';

import { models } from '../models';
import { tryCatch } from '../utils/error.utils';

const createRoom = tryCatch(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { participantId } = req.body;
    const userId = req.user?.id;

    const newRoom = new models.room({
      participants: [userId, participantId]
    });

    const room = await newRoom.save();

    await models.user
      .findByIdAndUpdate(userId, { $push: { rooms: room.id } })
      .exec();
    await models.user
      .findByIdAndUpdate(participantId, { $push: { rooms: room.id } })
      .exec();

    res.status(200).json({
      success: true,
      data: room,
      message: 'room created successfully'
    });
  }
);

export const RoomController = {
  createRoom
};
