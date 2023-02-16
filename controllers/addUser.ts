import mongoose from 'mongoose';
import { Message } from 'node-telegram-bot-api';
import { dbMongooseUri, handleError } from '../utils';
import { Users } from '../schemas';
import { IUser } from '../interfaces';

const addUser = async (msg: Message): Promise<void> => {
  if (!msg.from) return;

  const { id } = msg.from;

  const newUser: IUser = { ...msg.from };

  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(dbMongooseUri);

    const user: IUser | null = await Users.findOne({ id });

    if (user) {
      return;
    }

    await Users.create(newUser);
  } catch (err: unknown) {
    handleError(JSON.stringify(err));
  }
};

export default addUser;
