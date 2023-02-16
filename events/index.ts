import { Message } from 'node-telegram-bot-api';
import bot from '../bot';
import {
  addChat,
  addUser,
  getPhotoFromQuery,
  help,
  removeChat,
  removeScheduledEvent,
  setScheduledEvent,
} from '../controllers';

const events: Record<string, RegExp> = {
  everything: /(.*?)/,
  help: /\/help/,
  start: /\/start/,
  stop: /\/stop/,
  getPhoto: /\/get_photo/,
  scheduledEvent: /\/scheduled_event/,
  unscheduledEvent: /\/unscheduled_event/,
};

bot.onText(events.everything, (msg: Message): Promise<void> => addUser(msg));

bot.onText(events.help, (msg: Message): void => help(msg));

bot.onText(events.start, (msg: Message): Promise<void> => addChat(msg));

bot.onText(events.stop, (msg: Message): Promise<void> => removeChat(msg));

bot.onText(events.getPhoto, (msg: Message): void => getPhotoFromQuery(msg));

bot.onText(
  events.scheduledEvent,
  (msg: Message): Promise<void> => setScheduledEvent(msg)
);

bot.onText(
  events.unscheduledEvent,
  (msg: Message): Promise<void> => removeScheduledEvent(msg)
);
