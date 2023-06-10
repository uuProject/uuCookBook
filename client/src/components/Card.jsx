import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InfoCircleOutlined } from '@ant-design/icons';

const Card = ({ recipe }) => {
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
        <span className="card-title fw-bold">{recipe.name}</span>
        <button
          className="btn btn-primary d-flex align-middle justify-content-center"
          type="submit"
          onClick={() => Toggle()}
        >
          <InfoCircleOutlined />
        </button>
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
  }).isRequired,

};

export default Card;
