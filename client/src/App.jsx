import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
// import RecipeDetail from './components/RecipeDetail';

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  // const [modalState, setModalState] = useState(false);

  return (
    <div className="App">
      {/* <RecipeDetail /> */}
      <Navbar searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} />
      <Recipes searchInputValue={searchInputValue} />
    </div>
  );
};

export default App;
