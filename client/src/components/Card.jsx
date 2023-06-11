import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InfoCircleOutlined } from '@ant-design/icons';
import RecipeDetail from './RecipeDetail';

const Card = ({ units, recipe }) => {
  const [modalState, setModalState] = useState(false);
  const Toggle = () => setModalState(!modalState);

  return (
    <div className="card h-100">
      <img
        className="card-img-top h-75"
        src={`${process.env.REACT_APP_FILE_SERVER_ADDRESS}/${recipe.image}`}
        alt={recipe.name}
      />
      <div className="card-body d-flex justify-content-between align-items-center">
        <span className="fw-bold">{recipe.name}</span>
        <button
          className="btn btn-primary d-flex align-middle justify-content-center"
          type="submit"
          onClick={() => Toggle()}
        >
          <InfoCircleOutlined />
        </button>
      </div>
      {
        modalState
          && (
            <RecipeDetail
              modalState={modalState}
              toggleState={Toggle}
              units={units}
              recipe={recipe}
            />
          )
      }
    </div>
  );
};

Card.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    uniqueIdentifier: PropTypes.string.isRequired,
    shortcut: PropTypes.string.isRequired,
  })).isRequired,
  recipe: PropTypes.shape({
    uniqueIdentifier: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    servings: PropTypes.number,
    preparationTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
      unitUniqueIdentifier: PropTypes.string,
    }).isRequired),
  }).isRequired,
};

export default Card;
