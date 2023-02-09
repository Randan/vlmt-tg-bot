import mongoose, { Schema } from 'mongoose';
import { dbComplimentsCollection } from '../utils';
import { ICompliment } from '../interfaces';

const complimentSchema = new Schema<ICompliment>({
  value: String
});

const Compliments = mongoose.model(dbComplimentsCollection, complimentSchema);

export default Compliments;
