import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ searchInputValue, setSearchInputValue }) => {
  const items = [
    {
      name: 'Food',
      link: '/#',
    },
    {
      name: 'Drinks',
      link: '/#',
    },
  ];

  const [activeItemName, setActiveItemName] = useState('');

  const handleChange = (event) => {
    event.preventDefault();

    setSearchInputValue(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="/#"
          onClick={() => setActiveItemName('')}
        >
          Cook Book
        </a>
        <div className="collapse navbar-collapse mx-2d-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {items.map(({ name, link }) => (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeItemName === name ? 'active' : ''}`}
                  href={link}
                  onClick={() => setActiveItemName(name)}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search">
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
