import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { BASE_URL } from '../constants';
import html2canvas from 'html2canvas';

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
  const paletteRefs = useRef({});
  const navigate = useNavigate();
  

  useEffect(() => {
    loadPalettes();

  }, []);

  const loadPalettes = async() => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const user_id = userData.userId;


    const url = `${BASE_URL}/users/${user_id}/palettes`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {

        const loadedPalettes = Object.entries(result).map(([name, colors]) => ({
          name,  
          colors: colors.map(color => `#${color}`)
        }));

        localStorage.setItem('palettes', JSON.stringify(loadedPalettes));

        setPalettes(loadedPalettes);
      }

    } catch (error) {
      console.error('Error fetching palettes:', error);
    }


};




  const createPalette = () => {
    navigate('/create-palette');
  };

  const openPalette = (paletteName) => {
    navigate(`/create-palette/${paletteName}`);
  };

  const deletePalette = async(paletteName, e) => {


    e.stopPropagation();  
    const userData = JSON.parse(localStorage.getItem('userData'));
    const user_id = userData.userId;
    const token = userData.token;



    try {
      const response = await fetch(`${BASE_URL}/users/${user_id}/palettes/${paletteName}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json ',
          'Authorization': `Bearer ${token}`},
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        localStorage.removeItem(`palette-${paletteName}`);
        loadPalettes();
      }
      else {
        console.error(result.error);
      }

    } catch (error) {
      console.error('Error deleting palette:', error);
    }

    
    
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
