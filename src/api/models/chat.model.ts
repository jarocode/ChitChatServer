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
  room_id: {
    required: true,
    type: Schema.Types.ObjectId
  },
  created_at: { type: Date, default: Date.now }
});

ChatSchema.pre('save', function (next) {
  this.created_at = new Date(Date.now());
  next();
});

const Chat = model('Chat', ChatSchema);

export default Chat;
