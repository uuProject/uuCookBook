import * as fs from 'fs';

export const getRecipes = (path) => {
  const files = fs.readdirSync(path);
  const recipes = [];

  for (let i = 0; i < files.length; i += 1) {
    try {
      const recipe = fs.readFileSync(`${path}/${files[i]}`, 'utf8');
      recipes.push(JSON.parse(recipe));
    } catch (err) {
      console.error(err);

      if (err.code !== 'ENOENT') {
        return err;
      }
    }
  }

  return recipes;
};
