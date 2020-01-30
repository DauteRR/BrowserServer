import mongoose, { Schema, Document } from 'mongoose';

export interface IError extends Document {
  url: string;
  errorType: string;
  message: string;
  lastVisited: Date;
  baseDomain: boolean;
}

const ErrorSchema: Schema = new Schema({
  url: { type: String },
  errorType: { type: String },
  message: { type: String },
  baseDomain: { type: Boolean },
  lastVisited: { type: Date }
});

export default mongoose.model<IError>('Error', ErrorSchema, 'error');
