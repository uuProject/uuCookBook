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
  }).isRequired,
};

export default Recipe;
