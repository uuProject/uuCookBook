import express from 'express';
import * as dotenv from 'dotenv';
import { getRecipes } from './storage/storage.js';

dotenv.config();

const app = express();
const port = process.env.HTTP_SERVER_PORT;

app.get('/status', (req, res) => {
  res.status(200).send('');
});

app.get('/recipes', (_, res) => {
  res.setHeader('Content-Type', 'application/json');

  const recipes = getRecipes(`${process.env.STORAGE_PATH}/recipe`);
  if (recipes instanceof Error) {
    res.status(500).send({
      error: recipes.message,
    });
  }

  res.status(200).send(recipes);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
