import { Schema, model } from 'mongoose';

const RoomSchema = new Schema({
  participants: [Schema.Types.ObjectId]
});

const Room = model('Room', RoomSchema);

export default Room;
