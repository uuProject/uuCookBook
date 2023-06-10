import React from 'react';
import PropTypes from 'prop-types';

const Recipe = ({ recipe }) => {
  if (!recipe) {
    return (
      <div>

        <h1>Hello World</h1>
        <hr />
      </div>

    ); // Add a null check to handle undefined recipe
  }

  return (
    <h1>Hello World</h1>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    uniqueIdentifier: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

Recipe.defaultProps = {
  recipe: null, // Provide a default value of null for the recipe prop
};

export default Recipe;
