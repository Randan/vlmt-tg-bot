import 'dotenv/config';
import cron from 'node-cron';

const cronOptions = {
  scheduled: true,
  timezone: process.env.TIMEZONE
};

cron.schedule('0 10 * * *', () => {

}, cronOptions);
