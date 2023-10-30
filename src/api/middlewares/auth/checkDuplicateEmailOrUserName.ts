import { Request, Response, NextFunction } from 'express';
import { models } from '../../models';

const checkDuplicateEmailOrUserName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username } = req.body;
    const existingUserWithUsername = await models.user
      .findOne({ username })
      .exec();
    const existingUserWithEmail = await models.user.findOne({ email }).exec();

    if (existingUserWithUsername)
      return res.status(400).send({
        message: { errorStatus: 1, info: 'Failed! Username is already in use!' }
      });
    if (existingUserWithEmail)
      return res.status(400).send({
        message: { errorStatus: 1, info: 'Failed! Email is already in use!' }
      });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: { error } });
  }
};

export default checkDuplicateEmailOrUserName;
