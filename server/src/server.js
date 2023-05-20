import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.HTTP_SERVER_PORT;

app.get('/status', (req, res) => {
  res.status(200).send('');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
