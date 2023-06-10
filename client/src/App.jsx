import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';

const App = () => {
    const [searchInputValue, setSearchInputValue] = useState('');

    return (
        <div className="App">
            <Navbar searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} />
      <Recipes searchInputValue={searchInputValue} />
        </div>
    )
};

export default App;
