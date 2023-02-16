import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
  id: Number,
  is_bot: Boolean,
  first_name: String,
  last_name: {
    type: String,
    default: undefined
  },
  username: {
    type: String,
    default: undefined
  },
  language_code: {
    type: String,
    default: undefined
  }
});

const Users = mongoose.model('users', userSchema);

export default Users;
