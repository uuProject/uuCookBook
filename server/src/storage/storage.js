import * as fs from 'fs';

export const getRecipes = async (path) => {
  const recipes = [];

  const files = fs.readdirSync(path);

  for (let i = 0; i < files.length; i += 1) {
    try {
      const recipe = fs.readFileSync(`${path}/${files[i]}`, 'utf8');
      recipes.push(JSON.parse(recipe));
    } catch (err) {
      console.error(err);

      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }

  return recipes;
};
