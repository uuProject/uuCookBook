import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Recipes = ({ searchInputValue }) => {
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

  const filteredRecipes = [];

  if (searchInputValue !== 0) {
    recipes.forEach((recipe) => {
      if (recipe.name.toLowerCase() === searchInputValue.toLowerCase()) {
        filteredRecipes.push(recipe);
      }
    });
  }

  return (
    <div className="container m-5">
      {filteredRecipes.length !== 0 ? (
        <div
          className="d-grid justify-items-center align-items-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(18em, 1fr))',
            gridAutoRows: '20em',
            columnGap: '1em',
            rowGap: '1em',
            columns: '4em',
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

Recipes.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
};

export default Recipes;
