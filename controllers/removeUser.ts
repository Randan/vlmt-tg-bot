import mongoose from 'mongoose';
import { Message } from 'node-telegram-bot-api';
import { dbMongooseUri, handleError } from '../utils';
import { Users } from '../schemas';

const removeUser = async (msg: Message): Promise<void> => {
  if (!msg.from) return;

  const { id } = msg.from;

  try {
    mongoose.connect(dbMongooseUri);

    await Users.findOneAndDelete({
      telegramId: id,
    });
  } catch (err: unknown) {
    handleError(JSON.stringify(err));
  }
};

export default removeUser;
