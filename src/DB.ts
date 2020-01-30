import mongoose, { Connection, Query, DocumentQuery } from 'mongoose';
import VisitedModel, { IVisited } from './models/Visited.model';
import NotVisitedModel from './models/NotVisited.model';
import ErrorModel from './models/Error.model';

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

  Search(parameters: SearchParameters): DocumentQuery<IVisited[], IVisited, {}> {
    const { text } = parameters;
    return VisitedModel.find({ $text: { $search: text } }, { score: { $meta: 'textScore' } })
      .sort({
        score: { $meta: 'textScore' }
      })
      .limit(50);
  }

  GetVisitedWebpagesCount(): Query<number> {
    return VisitedModel.countDocuments();
  }

  GetNotVisitedWebpagesCount(): Query<number> {
    return NotVisitedModel.countDocuments();
  }

  GetErrorWebpagesCount(): Query<number> {
    return ErrorModel.countDocuments();
  }
}

export default Database;
