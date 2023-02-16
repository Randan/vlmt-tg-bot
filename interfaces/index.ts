import { Chat, User } from 'node-telegram-bot-api';

export type ScheduledEventType = 'photo' | 'dod_report' | 'p_tournament';

export interface IScheduledEvent {
  type: ScheduledEventType;
  time: string;
  photoQuery?: string;
}

export interface IUser extends User {}

export interface IChat extends Chat {
  scheduled_events?: IScheduledEvent[];
}

interface IUnsplashUrls {
  large: string;
  regular: string;
  raw: string;
  small: string;
}

interface IUnsplashUser {
  username: string;
  name: string;
}

export interface IUnsplashResponse {
  id: number;
  width: number;
  height: number;
  urls: IUnsplashUrls;
  color: string | null;
  user: IUnsplashUser;
}
