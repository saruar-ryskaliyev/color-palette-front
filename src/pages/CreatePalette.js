import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ChromePicker, TwitterPicker } from 'react-color';





const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`;

const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    width: 100%;
`;

const ColorSwatch = styled.div`
    height: 250px;
    background-color: ${(props) => props.color};
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    padding: 10px;
`;

const Dropdown = styled.select`
  padding: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
`;

const ColorPickerContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;  
  align-items: center;      
  flex-direction: column;
`;

const MyColorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
`;

const MyColorSwatch = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
`;

export default function CreatePalette() {

    const navigate = useNavigate();

    useEffect(() => {
        const loadedColorObjects = JSON.parse(localStorage.getItem('colors')) || [];
      
        const loadedColorStrings = loadedColorObjects.map(colorObj => colorObj.hex);
      
        setMyColors(loadedColorStrings);
      }, []);
      

    
    const [colorFormat, setColorFormat] = useState('hex');
    const [colors, setColors] = useState([
        '#1ABC9C',
        '#16A085',
        '#9B59B6',
        '#E74C3C',
        '#2C3E50',
    ]);
    const [currentColor, setCurrentColor] = useState('#fff'); 
    const [myColors, setMyColors] = useState([]); 


    console.log(myColors)


    
      const addNewColor = (color) => {
        setColors([...colors, color]);
      };
    
      const handleColorChange = (color) => {
        setCurrentColor(color.hex);
      };
    
      const selectMyColor = (color) => {
        setCurrentColor(color);
      };
    
      const goBack = () => {
        navigate('/my-palettes');
      };
    
      return (
        <Container>
          <Header>
            <Button onClick={goBack}>Back</Button>
            <div>
              <Button onClick={() => addNewColor(currentColor)}>Add Color</Button>
            </div>
          </Header>
          <ColorPickerContainer>
          < h3>Color Picker</h3>
            <ChromePicker color={currentColor} onChangeComplete={handleColorChange} />
            <h3>My Colors</h3>
            <TwitterPicker
                colors={myColors}
                color={currentColor}
                onChangeComplete={handleColorChange}
            />
          </ColorPickerContainer>
         


          <ColorGrid>
            {colors.map((color, index) => (
              <ColorSwatch key={index} color={color}>
                {color.toUpperCase()}
              </ColorSwatch>
            ))}
          </ColorGrid>
        </Container>
      );
    }
    