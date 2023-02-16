import { Message } from 'node-telegram-bot-api';

export const webGreetings = () =>
  `<style>body { min-height: 100vh; display: flex; justify-content: center; align-items: center; flex-direction: column; margin: 0; background-color: #40a5ed; font-family: sans-serif; color: #252324; }</style>
  <h1>Вітаю, я <a href='https://t.me/heWhoMustSendYouComplimentsBot' style='color: #252324;'>ComplimentBot</a>!</h1>
  <h2>Заходь!</h2>`;

export const botWokeUp = () => 'Вітаю, я прокинувся!';

export const help = (msg: Message): string => {
  if (!msg.from) return '';

  const { first_name } = msg.from;

  return (
    `Вітаю, ${first_name}! Мене звати VLMT-Bot.\n` +
    '\n' +
    '/help - Допомога\n' +
    '/start - Увімкни мене\n' +
    '/stop - Скажи мені "Па-па"'
  );
};

export const helpNotify = (msg: Message): string => {
  if (!msg.from) return '';

  const { first_name, username } = msg.from;

  return `${username ? `@${username}` : first_name} попросив(-ла) про допомогу`;
};

export const userRemoved = (msg: Message): string => {
  if (!msg.from) return '';

  const { first_name } = msg.from;

  return `Ну що, ${first_name}! Будемо досвіданькатись? Мені було добре з тобою, приходь ще =)`;
};

export const userRemovedNotify = (msg: Message): string => {
  if (!msg.from) return '';

  const { first_name, username } = msg.from;

  return `${
    username ? `@${username}` : first_name
  } більше не хоче отримувати компліменти`;
};

export const userNotExists = () =>
  'Ми з вами не знайомі. Давайте познайомимось. Напишіть /start';

export const userGotPhoto = (msg: Message, photoTheme: string): string => {
  if (!msg.from) return '';

  const { first_name, username } = msg.from;

  return `${username ? `@${username}` : first_name} отримaв(-ла) світлину на тему "${photoTheme}"`;
};
