import React, { useState } from 'react';

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

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#" onClick={() => setActiveItemName('')}>Cook Book</a>
        <div className="collapse navbar-collapse mx-2" id="navbarSupportedContent">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
