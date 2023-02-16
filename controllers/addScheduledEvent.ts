import { Message } from 'node-telegram-bot-api';
import bot from '../bot';

const addScheduledEvent = async (msg: Message): Promise<Message> =>
  bot.sendMessage(msg.chat.id, 'Який івент ти хочеш засетапити?', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Підор дня', callback_data: 'scheduled-p-tournament' }],
        [{ text: 'Щоденна світлина', callback_data: 'scheduled-photo' }],
        [{ text: 'Зведення Генштабу', callback_data: 'scheduled-dod-report' }],
      ],
    },
  });

export default addScheduledEvent;
