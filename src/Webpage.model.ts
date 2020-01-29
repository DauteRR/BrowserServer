import mongoose, { Schema, Document } from 'mongoose';
import { Database } from './DB';

export interface IWebPageHeaders {
  h1?: string[];
  h2?: string[];
  h3?: string[];
  h4?: string[];
  h5?: string[];
  h6?: string[];
}

export interface IWebPageMeta {
  keywords?: string[];
  description?: string;
  author?: string;
  lang?: string;
  location?: string;
  organization?: string;
}

export interface IWebpage extends Document {
  title: string;
  meta: IWebPageMeta;
  content: string;
  headers: IWebPageHeaders;
  lastVisited: Date;
  url: string;
  baseDomain: boolean;
}

const WebpageSchema: Schema = new Schema({
  title: { type: String },
  meta: { type: Object },
  content: { type: String },
  headers: { type: Object },
  lastVisited: { type: Date },
  url: { type: String },
  baseDomain: { type: Boolean }
});

export default mongoose.model<IWebpage>('Webpage', WebpageSchema, 'visited');
