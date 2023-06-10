import React, { useEffect, useState } from 'react';
import Card from './Card';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_HTTP_SERVER_ADDRESS}/recipes`,
          {
            method: 'GET',
          },
        );

        switch (resp.status) {
        case 200:
          setRecipes(await resp.json());
          return;
        default:
          console.error(`unexpected status code ${resp.statusCode}`);
        }
      } catch (err) {
        console.error('unexpected error', err);
      }
    };

    fetchData().catch(console.error);
  }, []);

  console.log(recipes);

  return (
    <div>
      {recipes.length !== 0 ? (
        <div>
          {recipes.map((recipe) => <Card recipe={recipe} />)}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Recipes;
