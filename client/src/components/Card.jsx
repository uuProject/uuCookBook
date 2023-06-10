import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ recipe }) => (
  <div
    className="card"
    style={{
      width: '18rem',
      margin: '0.2rem',
    }}
  >
    <img
      className="card-img-top"
      src={`${process.env.REACT_APP_FILE_SERVER_ADDRESS}/${recipe.image}`}
      alt={recipe.name}
    />
    <div className="card-body">
      <h5 className="card-title">{recipe.name}</h5>
      <p className="card-text">{recipe.description}</p>
      <a href="/#" className="btn btn-primary">Detail</a>
    </div>
  </div>
);

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
