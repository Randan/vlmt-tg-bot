/* eslint-disable import/first */
import express, { Express, Request, Response } from 'express';
import { appPort, lib, notifyAdmin } from './utils';

const app: Express = express();

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send(lib.webGreetings());
});

import './events';

app.listen(appPort, () => {
  notifyAdmin(lib.botWokeUp());
  console.log(`⚡⚡⚡ ComplimentBot Alive on PORT: ${appPort}`);
});

import './cron';
