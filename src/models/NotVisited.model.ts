import mongoose, { Schema, Document } from 'mongoose';

export interface INotVisited extends Document {
  url: string;
  depth: number;
  baseDomain: boolean;
}

const NotVisitedSchema: Schema = new Schema({
  url: { type: String },
  depth: { type: Number },
  baseDomain: { type: Boolean }
});

export default mongoose.model<INotVisited>('NotVisited', NotVisitedSchema, 'notVisited');
