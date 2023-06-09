import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import ReadJSONFiles from './readJSONFiles';

const App = () => {
  const folderPath = 'storage/recipe';

  <div className="App">
      <Navbar />
      <ReadJSONFiles folderPath={folderPath} />
      <div className="d-flex p-2">
      <Card />

    </div>

    </div>;
};

export default App;
