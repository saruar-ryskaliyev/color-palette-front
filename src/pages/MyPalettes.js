import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CreatePalette from './CreatePalette';

function MyPalettes() {

  const styleButton = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const navigate = useNavigate()

  const createPalette = () => {
   
    navigate('/create-palette');
    


  };


  return (
    <div>
      <h1>My Palettes</h1>

      <button onClick={createPalette} style={styleButton}>
        Create Palette
      </button>
    </div>
  );
}

export default MyPalettes;