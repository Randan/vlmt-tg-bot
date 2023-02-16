import { Message } from 'node-telegram-bot-api';
import sendPhotoFromStock from './sendPhotoFromStock';

const getPhotoFromQuery = (msg: Message): void => {
  if (!msg.chat) return;

  const photoQuery: string = msg.text?.replace('/getPhoto', '').trim() || '';

  sendPhotoFromStock(msg, photoQuery);
};

export default getPhotoFromQuery;
