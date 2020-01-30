import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitedHeaders {
  h1?: string[];
  h2?: string[];
  h3?: string[];
  h4?: string[];
  h5?: string[];
  h6?: string[];
}

export interface IVisitedMeta {
  keywords?: string[];
  description?: string;
  author?: string;
  lang?: string;
  location?: string;
  organization?: string;
}

export interface IVisited extends Document {
  title: string;
  meta: IVisitedMeta;
  content: string;
  headers: IVisitedHeaders;
  lastVisited: Date;
  url: string;
  baseDomain: boolean;
}

const VisitedSchema: Schema = new Schema({
  title: { type: String },
  meta: { type: Object },
  content: { type: String },
  headers: { type: Object },
  lastVisited: { type: Date },
  url: { type: String },
  baseDomain: { type: Boolean }
});

export default mongoose.model<IVisited>('Visited', VisitedSchema, 'visited');
