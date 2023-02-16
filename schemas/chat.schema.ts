import mongoose, { Schema } from 'mongoose';
import { ChatPermissions, ChatPhoto } from 'node-telegram-bot-api';
import { IChat, IScheduledEvent } from '../interfaces';

const chatPermissionsSchema = new Schema<ChatPermissions>({
  can_send_messages: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_send_media_messages: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_send_polls: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_send_other_messages: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_add_web_page_previews: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_change_info: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_invite_users: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  can_pin_messages: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
});

const chatPhotoSchema = new Schema<ChatPhoto>({
  small_file_id: String,
  big_file_id: String,
});

const scheduledEventsSchema = new Schema<IScheduledEvent>({
  type: String,
  time: String,
  photoQuery: {
    type: String,
    optional: true
  }
});

const chatSchema = new Schema<IChat>({
  id: Number,
  type: String,
  title: {
    type: String,
    default: undefined,
    optional: true,
  },
  username: {
    type: String,
    default: undefined,
    optional: true,
  },
  first_name: {
    type: String,
    default: undefined,
    optional: true,
  },
  last_name: {
    type: String,
    default: undefined,
    optional: true,
  },
  photo: {
    type: chatPhotoSchema,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
    optional: true,
  },
  invite_link: {
    type: String,
    default: undefined,
    optional: true,
  },
  permissions: {
    type: chatPermissionsSchema,
    default: undefined,
  },
  can_set_sticker_set: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  sticker_set_name: {
    type: String,
    default: undefined,
    optional: true,
  },
  has_private_forwards: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  has_protected_content: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  slow_mode_delay: {
    type: Number,
    default: undefined,
    optional: true,
  },
  message_auto_delete_time: {
    type: Number,
    default: undefined,
    optional: true,
  },
  linked_chat_id: {
    type: Number,
    default: undefined,
    optional: true,
  },
  all_members_are_administrators: {
    type: Boolean,
    default: undefined,
    optional: true,
  },
  scheduled_events: {
    type: [scheduledEventsSchema],
    default: [],
    optional: true
  }
});

const Chats = mongoose.model('chats', chatSchema);

export default Chats;
