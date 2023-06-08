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

export const updateRecipe = (path, id, body) => {
  const filePath = `${path}/${id}.json`;
  const data = JSON.stringify(body);

  try {
    fs.writeFile(filePath, data);
    console.log('File updated successfully.');
  } catch (error) {
    throw new Error('Something went wrong...');
  }
};
