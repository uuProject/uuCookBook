import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

const Navbar = () => {
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
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInput.length > 0) {
      console.log(searchInput);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#" onClick={() => setActiveItemName('')}>Cook Book</a>
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
            <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={searchInput} />
            <button className="btn btn-outline-primary" type="submit" onClick={handleSubmit} aria-label="Search">
              <SearchOutlined style={{
                verticalAlign: 'middle',
              }}
              />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
