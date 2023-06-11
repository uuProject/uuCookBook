import React from 'react';
import PropTypes from 'prop-types';


const RecipeDetail = ({ show }) => (

  show

    ? (
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <h1>hello world</h1>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
    : null
);

RecipeDetail.propTypes = {
  show: PropTypes.bool,
};

RecipeDetail.defaultProps = {
  show: false,
};

export default RecipeDetail;
