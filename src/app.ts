import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Database, SearchParameters } from './DB';

function main() {
  const db = new Database();
  db.Connect();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', async (req, res) => {
    const count = await db.GetRegisteredWebpagesCount();
    res.send(`Browser server: ${count} pages registered`);
  });

  app.get('/ping', async (req, res) => {
    res.send(JSON.stringify({ ping: 'pong' }));
  });

  app.post('/search', async (req, res) => {
    const results = await db.Search(req.body as SearchParameters);
    res.send(
      JSON.stringify(
        results.map(result => ({
          url: result.url,
          title: result.title,
          lastVisited: result.lastVisited,
          meta: result.meta
        }))
      )
    );
  });

  app.listen(3001, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`Server is listening on port 3001`);
  });
}

main();
