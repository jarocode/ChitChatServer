import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { models } from '../models';

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new models.user({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    return res.status(200).send({
      message: { errorStatus: 1, info: 'registration successful!' }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: { error } });
  }
};

export const AuthController = {
  signUp
};
