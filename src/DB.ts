import mongoose, { Connection, Query, DocumentQuery } from 'mongoose';
import WebpageModel, { IWebpage } from './Webpage.model';

export interface SearchParameters {
  text: string;
  limit: number;
}

export class Database {
  static MONGO_PORT: string = process.env.MONGO_PORT || '27017';
  static DB_NAME: string = process.env.DB_NAME || 'websDB';

  db: Connection;

  constructor() {}

  async Connect() {
    await mongoose
      .connect(`mongodb://localhost:${Database.MONGO_PORT}/${Database.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .catch(error => {
        throw 'Database connection error';
      });

    mongoose.Promise = global.Promise;

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

  Search(parameters: SearchParameters): DocumentQuery<IWebpage[], IWebpage, {}> {
    const { text } = parameters;
    return WebpageModel.find({ $text: { $search: text } }, { score: { $meta: 'textScore' } })
      .sort({
        score: { $meta: 'textScore' }
      })
      .limit(100);
  }

  GetRegisteredWebpagesCount(): Query<number> {
    return WebpageModel.countDocuments();
  }
}

export default Database;
