import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ReadJSONFiles = ({ folderPath }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(folderPath);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error(`Error fetching recipes. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [folderPath]);

  return <div>{JSON.stringify(recipes)}</div>;
};

ReadJSONFiles.propTypes = {
  folderPath: PropTypes.string.isRequired,
};

export default ReadJSONFiles;
