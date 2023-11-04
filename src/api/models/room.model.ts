import { Schema, model } from 'mongoose';

const RoomSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  participants: [Schema.Types.ObjectId]
});

const Room = model('Room', RoomSchema);

export default Room;
