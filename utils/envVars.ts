import 'dotenv/config';

const adminId: string = process.env.ADMIN_TG_ID || '';
const appPort: string = process.env.PORT || '';
const dbUrl: string = process.env.DB_URL || '';
const timezone: string = process.env.TIMEZONE || '';
const unsplashAppToken: string = process.env.UNSPLASH_APP_TOKEN || '';
const unsplashUri: string = process.env.UNSPLASH_URI || '';

const dbMongooseUri: string = dbUrl
  ? dbUrl + '?retryWrites=true&w=majority'
  : '';

export {
  adminId,
  appPort,
  dbMongooseUri,
  dbUrl,
  timezone,
  unsplashAppToken,
  unsplashUri,
};
