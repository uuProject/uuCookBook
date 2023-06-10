import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ recipe }) => {
  if (!recipe) {
    return null; // Add a null check to handle undefined recipe
  }

  return (
    <div
      className="card"
      style={{
        width: '18rem',
        margin: '0.2rem',
      }}
    >
      <img src={recipe.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{recipe.name}</h5>
        <p className="card-text">{recipe.description}</p>
        <a href="/#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
};

Card.propTypes = {
  recipe: PropTypes.shape({
    uniqueIdentifier: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

Card.defaultProps = {
  recipe: null, // Provide a default value of null for the recipe prop
};

export default Card;
