import mongoose from 'mongoose';
import { AxiosResponse } from 'axios';
import { Chat, Message } from 'node-telegram-bot-api';
import bot from '../bot';
import { getPhoto } from '../api';
import { dbMongooseUri, handleError } from '../utils';
import { Chats, Users } from '../schemas';
import { IUnsplashResponse, IUser } from '../interfaces';

const sendPhotoFromStock = async (
  msg: Message,
  query: string,
  caption?: string
): Promise<void> => {
  if (!msg.chat) return;

  const { id } = msg.chat;

  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(dbMongooseUri);

    const chat: Chat | null = await Chats.findOne({ id });
    const user: IUser | null = await Users.findOne({ id });

    if (!chat && !user) {
      return;
    }

    const photo: AxiosResponse<IUnsplashResponse> = await getPhoto(query);

    if (photo) {
      bot.sendPhoto(id, photo.data.urls.regular, {
        caption,
      });
    }
  } catch (err: unknown) {
    handleError(JSON.stringify(err));
  }
};

export default sendPhotoFromStock;
