import React from 'react';
import PropTypes from 'prop-types';

const RecipeDetail = ({
  units, recipe, modalState, toggleState,
}) => {
  const unitsObject = units.reduce((o, unit) => (
    Object.assign(o, { [unit.uniqueIdentifier]: unit.shortcut })), {});

  return (
    <div
      className="modal"
      role="dialog"
      style={{
        zIndex: 100,
        top: '15%',
        display: modalState ? 'flex' : 'none',
      }}
    >
      <div className="modal-dialog w-100" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title">{recipe.name}</h5>
          </div>
          <div className="modal-body">
            <p className="fw-bold">Preparation time</p>
            <p>{`${recipe.preparationTime} minutes`}</p>

            <p className="fw-bold">Servings</p>
            <p>{`${recipe.servings}`}</p>

            <p className="fw-bold">Description</p>
            <p>{recipe.description}</p>

            <p className="fw-bold">Ingredients</p>
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.name} className="d-flex justify-content-between">
                <span>{ingredient.name}</span>

                {ingredient.amount === 0 ? (
                  <span>{`${unitsObject[ingredient.unitUniqueIdentifier]}`}</span>
                ) : (
                  <span>{`${ingredient.amount} ${unitsObject[ingredient.unitUniqueIdentifier]}`}</span>
                )}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={() => toggleState()}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  modalState: PropTypes.bool.isRequired,
  toggleState: PropTypes.func.isRequired,
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

export default RecipeDetail;
