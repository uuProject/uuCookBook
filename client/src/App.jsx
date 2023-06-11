import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
// import RecipeDetail from './components/RecipeDetail';

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_HTTP_SERVER_ADDRESS}/units`,
          {
            method: 'GET',
          },
        );

        switch (resp.status) {
        case 200:
          setUnits(await resp.json());
          return;
        default:
          console.error(`unexpected status code ${resp.statusCode}`);
        }
      } catch (err) {
        console.error('unexpected error', err);
      }
    };

    fetchUnits().catch(console.error);
  }, []);

  return (
    <div className="App">
      <Navbar searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} />
      <Recipes units={units} searchInputValue={searchInputValue} />
    </div>
  );
};

export default App;
