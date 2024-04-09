import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ChromePicker, TwitterPicker } from 'react-color';
import { useParams } from 'react-router-dom';
import { EditMyColors } from './EditMyColors';
import '../MyColors.css';


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

const Input = styled.input`
    padding: 8px;
    margin-right: 10px;
    width: 200px; // Adjust the width as needed
`;

const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
    width: 100%;
`;

const ColorSwatch = styled.div`
  position: relative;
  height: 250px;
  background-color: ${props => props.color};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  &:hover {
    & > button, & > div {
      display: flex; // This ensures both the button and the div are shown
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

const Button = styled.button`
    padding: 10px 20px;
    margin: 0 5px;
`;

const ColorPickerContainer = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


export default function CreatePalette() {


    const navigate = useNavigate();
    const { paletteName } = useParams(); // Retrieve the palette name from the URL
    const [colors, setColors] = useState([]);
    const [currentColor, setCurrentColor] = useState('#fff');
    const [myColors, setMyColors] = useState([]);
    const [name, setName] = useState('');
    const [editingColor, setEditingColor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const loadedColors = JSON.parse(localStorage.getItem('colors')) || [];
        setMyColors(loadedColors.map(colorObj => colorObj.hex));

        // Load existing palette if editing
        if (paletteName) {

            console.log(`palette-${paletteName}`);

            const existingPalette = JSON.parse(localStorage.getItem(`palette-${paletteName}`));

            if (existingPalette) {
                setColors(existingPalette.colors);
                setName(existingPalette.name);
            }
        }
    }, [paletteName]);

    const handleColorChange = color => {
        setCurrentColor(color.hex);
    };

    const addNewColor = () => {
        if (!colors.includes(currentColor)) {
            setColors([...colors, currentColor]);
        }
    };

    const deleteColor = index => {
        const newColors = [...colors];
        newColors.splice(index, 1);
        setColors(newColors);
    };

    const goBack = () => {
        navigate('/my-palettes');
    };

    const savePalette = () => {

        if (name === '') {
            alert('Please provide a name for the palette');
            return;
        }

        if (colors.length === 0) {
            alert('Please add at least one color to the palette');
            return;
        }

        const newPalette = {
            name: name || paletteName,  
            colors: colors
        };
        localStorage.setItem(`palette-${newPalette.name}`, JSON.stringify(newPalette));
        navigate('/my-palettes');
    };

    const editColor = (color) => {
        setEditingColor(color); // Store the hex value of the color being edited
        setIsOpen(true); // Open the modal
    };


    return (
        <Container>
            <Header>
                <Button onClick={goBack}>Back</Button>
                <div>
                    <Input
                        placeholder="Palette Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Button onClick={addNewColor}>Add Color</Button>
                    <Button onClick={savePalette}>Save Palette</Button>
                </div>
            </Header>
            <ColorPickerContainer>
                <h3>Color Picker</h3>
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
                        <DeleteButton onClick={() => deleteColor(index)}>&times;</DeleteButton>
                        <div className="editIcon" onClick={() => editColor(color)}> </div>
                        <EditMyColors
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            initialColor={editingColor || '#FFFFFF'}
                            onColorUpdate={(newColor) => {
                                const updatedColors = [...colors];
                                updatedColors[colors.indexOf(editingColor)] = newColor;
                                setColors(updatedColors);
                            }}/>
                    </ColorSwatch>
                ))}
            </ColorGrid>
        </Container>
    );
}
