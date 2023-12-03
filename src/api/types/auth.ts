import { ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  rooms: Array<ObjectId>;
}
