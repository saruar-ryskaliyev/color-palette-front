import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

const PaletteBox = styled.div`
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f9f9f9;
  &:hover {
    background-color: #e9e9e9;
    button {
      display: block;
    }
  }
`;

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
`;

const ColorPreview = styled.div`
  height: 40px;
  background-color: ${props => props.color};
`;

function MyPalettes() {
  const [palettes, setPalettes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPalettes();
  }, []);

  const loadPalettes = () => {
    const loadedPalettes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("palette-")) {
        const palette = JSON.parse(localStorage.getItem(key));
        loadedPalettes.push(palette);
      }
    }
    setPalettes(loadedPalettes);
  };

  const createPalette = () => {
    navigate('/create-palette');
  };

  const openPalette = (paletteName) => {
    navigate(`/create-palette/${paletteName}`);
  };

  const deletePalette = (paletteName, e) => {
    e.stopPropagation();  // Prevent opening the palette when clicking delete
    localStorage.removeItem(`palette-${paletteName}`);
    loadPalettes();
  };

  return (
    <div>
      <h1>My Palettes</h1>
      <button onClick={createPalette} style={{
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
      }}>
        Create Palette
      </button>
      <PaletteGrid>
        {palettes.map((palette) => (
          <PaletteBox key={palette.name} onClick={() => openPalette(palette.name)}>
            <h3>{palette.name}</h3>
            {palette.colors.map((color, index) => (
              <ColorPreview key={index} color={color} />
            ))}
            <DeleteButton onClick={(e) => deletePalette(palette.name, e)}>&times;</DeleteButton>
          </PaletteBox>
        ))}
      </PaletteGrid>
    </div>
  );
}

export default MyPalettes;
