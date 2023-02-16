import mongoose from 'mongoose';
import { Message } from 'node-telegram-bot-api';
import { dbMongooseUri, handleError } from '../utils';
import { Chats } from '../schemas';

const removeChat = async (msg: Message): Promise<void> => {
  if (!msg.chat) return;

  const { id } = msg.chat;

  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(dbMongooseUri);

    await Chats.findOneAndDelete({
      id,
    });
  } catch (err: unknown) {
    handleError(JSON.stringify(err));
  }
};

export default removeChat;
