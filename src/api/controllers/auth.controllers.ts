import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { models } from '../models';
import { generateToken } from '../utils/jwt.utils';
import { tryCatch, AppError } from '../utils/error.utils';

const signUp = tryCatch(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new models.user({
    username,
    email,
    password: hashedPassword
  });

  await user.save();

  return res
    .status(200)
    .send({ success: true, message: 'registration successful!' });
});

const signIn = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const isEmail = username.includes('.com');

    const user = await models.user
      .findOne(isEmail ? { email: username } : { username })
      .exec();

    if (!user) return next(new AppError('User does not exist', 400));
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return next(new AppError('Invalid Password!', 401));
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      rooms: user.rooms ?? null
    };

    const accessToken = generateToken(userData);
    res.status(200).send({
      success: true,
      message: 'Signed in successfully',
      accessToken,
      user: userData
    });
  }
);

export const AuthController = {
  signUp,
  signIn
};
