import mongoose from 'mongoose';
import { Message } from 'node-telegram-bot-api';
import { IChat, IScheduledEvent } from '../interfaces';
import { Chats } from '../schemas';
import { dbMongooseUri, handleError } from '../utils';

const removeScheduledEvent = async (msg: Message): Promise<void> => {
  if (!msg.chat) return;

  const {
    chat: { id },
  } = msg;

  const sheduledEventArr: string[] | undefined = msg.text?.split(' ');

  if (sheduledEventArr?.length) {
    const [, scheduledType] = sheduledEventArr;

    try {
      mongoose.set('strictQuery', false);
      mongoose.connect(dbMongooseUri);

      const existedChat: IChat | null = await Chats.findOne({
        id,
      });

      if (
        !existedChat?.scheduled_events?.find(
          (event: IScheduledEvent) => event.type === scheduledType
        )
      ) {
        return;
      }

      await Chats.findOneAndUpdate(
        { id },
        {
          scheduled_events: existedChat?.scheduled_events?.filter(
            (event: IScheduledEvent) => event.type !== scheduledType
          ),
        }
      );
    } catch (err: unknown) {
      handleError(JSON.stringify(err));
    }
  }
};

export default removeScheduledEvent;
