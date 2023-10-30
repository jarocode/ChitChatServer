import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { models } from '../models';
import { generateToken } from '../utils/jwt.utils';

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

    return res
      .status(200)
      .send({ success: true, message: 'registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error });
  }
};
const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await models.user.findOne({ username }).exec();

    if (!user)
      return res
        .status(400)
        .send({ success: false, message: 'User does not exist' });
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        success: false,
        accessToken: null,
        message: 'Invalid Password!'
      });
    }
    const userData = {
      id: user.id,
      username: user.username
    };
    const accessToken = generateToken(userData);
    res
      .status(200)
      .send({ success: true, message: 'Signed in successfully', accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: { error } });
  }
};

export const AuthController = {
  signUp,
  signIn
};
