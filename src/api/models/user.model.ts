import { Schema, model } from 'mongoose';

import { IUser } from '../types/auth';

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  rooms: [Schema.Types.ObjectId]
});

const User = model('User', UserSchema);

export default User;
