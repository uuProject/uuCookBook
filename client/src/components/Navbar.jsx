import React from 'react';
import PropTypes from 'prop-types';
import { ExperimentOutlined } from '@ant-design/icons';

const Navbar = ({ searchInputValue, setSearchInputValue }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setSearchInputValue(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between">
        <a
          className="navbar-brand d-flex justify-content-center align-items-center"
          href="/"
        >
          <ExperimentOutlined style={{ fontSize: '1.5em' }} />
        </a>
        <div className="" id="navbarSupportedContent">
          <form role="search" onSubmit={(event) => event.preventDefault()}>
            <input
              className="form-control me-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => handleChange(event)}
              value={searchInputValue}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
};

export default Navbar;
