import { getRecipes } from '../storage/storage.js';

export const statusRouter = (req, res) => {
  res.status(200);
  res.end();
};

export const recipesRouter = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    const recipes = await getRecipes(`${process.env.STORAGE_PATH}/recipe`);
    res.status(200).send({ data: recipes });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
