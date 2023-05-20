import express from 'express';

const app = express();
const port = 8080;

app.get('/status', (req, res) => {
  res.status(200).send('');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
