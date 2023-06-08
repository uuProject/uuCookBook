import { getRecipes, updateRecipe } from '../storage/storage.js';

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

export const updateRecipeRouter = async (req, res) => {
  const { id } = await req.params.id;
  const { body } = await req.body;
  const storagePath = `${process.env.STORAGE_PATH}/recipe`;

  try {
    updateRecipe(storagePath, id, body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong ...' });
  }
};
