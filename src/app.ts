import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Browser server');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});
