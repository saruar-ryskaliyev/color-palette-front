import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../constants';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
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
    ${DownloadButton} {
      display: block; /* This will show the button on hover */
    }
  }
`;


const ColorPreview = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${props => props.color};
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

const ColorItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: ${props => props.color};
  color: white;
  text-align: center;
`;

function MyProfile() {
  const [colors, setColors] = useState([]);
  const [palettes, setPalettes] = useState([]);
  const { user_id } = useParams();
  const paletteRefs = useRef({});

  useEffect(() => {
    fetch(`${BASE_URL}/users/${user_id}/colors`, {
      method: 'GET',
      headers: { 'accept': 'application/json' },
    }).then(response => response.json())
      .then(result => {
        if (result.colors) {
          setColors(result.colors.map(colorCode => ({
            hex: colorCode.startsWith('#') ? colorCode : `#${colorCode}`
          })));
        }
      })
      .catch(error => console.error('Error fetching colors:', error));

    fetch(`${BASE_URL}/users/${user_id}/palettes`, {
      method: 'GET',
      headers: { 'accept': 'application/json' },
    }).then(response => response.json())
      .then(result => {
        const palettesArray = Object.entries(result).map(([name, colors]) => ({
          name,
          colors: colors.map(color => `#${color}`)  
        }));
        setPalettes(palettesArray);
      })
      .catch(error => console.error('Error fetching palettes:', error));
  }, [user_id]);

  const downloadPaletteAsPNG = async (paletteName) => {
    const paletteRef = paletteRefs.current[paletteName];
    if (paletteRef) {
        // Find the button inside the PaletteBox and hide it
        const button = paletteRef.querySelector('button');
        button.style.display = 'none';
        
        const canvas = await html2canvas(paletteRef);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        
        // After capturing, show the button again
        button.style.display = 'block';

        // Use the created image for download
        let link = document.createElement('a');
        link.download = `${paletteName}.png`;
        link.href = image;
        link.click();
    }
};

  return (
    <div>
      <h1>Colors</h1>
      <ColorsGrid>
        {colors.map((color, index) => (
          <ColorItem key={index} color={color.hex}>
            {color.hex}
          </ColorItem>
        ))}
      </ColorsGrid>
      <h1>Palettes</h1>
      <PaletteGrid>
        {palettes.map((palette) => (
          <PaletteBox key={palette.name} ref={el => (paletteRefs.current[palette.name] = el)}>
          <h3>{palette.name}</h3>
          {palette.colors.map((color, index) => (
            <ColorPreview key={index} color={color} />
          ))}
          <DownloadButton onClick={() => downloadPaletteAsPNG(palette.name)}>
            Download PNG
          </DownloadButton>
        </PaletteBox>
        
        ))}
      </PaletteGrid>
    </div>
  );
}

export default MyProfile;
