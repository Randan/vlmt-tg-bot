import mongoose from 'mongoose';
import { Chat, Message } from 'node-telegram-bot-api';
import { dbMongooseUri, handleError } from '../utils';
import { Chats } from '../schemas';

const addChat = async (msg: Message): Promise<void> => {
  if (!msg.chat) return;

  const { id } = msg.chat;

  const newChat: Chat = { ...msg.chat };

  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(dbMongooseUri);

    const user: Chat | null = await Chats.findOne({ id });

    if (user) {
      return;
    }

    await Chats.create(newChat);
  } catch (err: unknown) {
    handleError(JSON.stringify(err));
  }
};

export default addChat;
