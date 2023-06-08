import express from 'express';
import * as dotenv from 'dotenv';
import { recipesRouter, statusRouter, updateRecipeRouter } from './router/router.js';

dotenv.config();

const app = express();
const port = process.env.HTTP_SERVER_PORT;

app.get('/status', statusRouter);

app.get('/recipes', recipesRouter);

app.put('/recipe/:id', updateRecipeRouter);

app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
});
