import React, { useEffect, useState } from 'react';
import Card from './Card';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
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

    fetchRecipe().catch(console.error);
  }, []);

  return (
    <div className="container">
      {recipes.length !== 0 ? (
        <div
          className="d-grid justify-items-center m-5"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(18em, 1fr))',
            rowGap: '1em',
          }}
        >
          {recipes.map((recipe) => <Card key={`${recipe.uniqueIdentifier}`} recipe={recipe} />)}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <h3>Nothing to display</h3>
        </div>
      )}
    </div>
  );
};

export default Recipes;
