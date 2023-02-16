import mongoose from 'mongoose';
import { Message } from 'node-telegram-bot-api';
import { IChat, IScheduledEvent } from '../interfaces';
import { Chats } from '../schemas';
import { dbMongooseUri, handleError } from '../utils';

const setScheduledEvent = async (msg: Message): Promise<void> => {
  if (!msg.chat) return;

  const {
    chat: { id },
  } = msg;

  const sheduledEventArr: string[] | undefined = msg.text?.split(' ');

  if (sheduledEventArr?.length) {
    const [, scheduledTime, scheduledType, photoQuery] = sheduledEventArr;

    const newEvent: IScheduledEvent =
      scheduledType === 'photo'
        ? {
          type: scheduledType as IScheduledEvent['type'],
          time: scheduledTime,
          photoQuery,
        }
        : {
          type: scheduledType as IScheduledEvent['type'],
          time: scheduledTime,
        };

    try {
      mongoose.set('strictQuery', false);
      mongoose.connect(dbMongooseUri);

      const existedChat: IChat | null = await Chats.findOne({
        id,
      });

      if (
        existedChat?.scheduled_events?.find(
          (event: IScheduledEvent) => event.type === scheduledType
        )
      ) {
        return;
      }

      const chat: IChat | null = await Chats.findOne({ id });

      if (!chat) {
        return;
      }

      await Chats.findOneAndUpdate(
        { id },
        {
          scheduled_events: chat.scheduled_events
            ? [...chat.scheduled_events, newEvent]
            : [newEvent],
        }
      );
    } catch (err: unknown) {
      handleError(JSON.stringify(err));
    }
  }
};

export default setScheduledEvent;
