import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  message: {
    required: true,
    type: String
  },
  user_id: {
    required: true,
    type: Schema.Types.ObjectId
  },
  room: {
    required: true,
    type: Schema.Types.ObjectId
  }
});

const Chat = model('Chat', ChatSchema);

export default Chat;
