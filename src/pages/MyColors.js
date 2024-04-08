import React, { useState } from 'react';
import '../MyColors.css';
import { EditMyColors } from './EditMyColors';


function MyColors() {


    const [colors, setColors] = useState(() => {
        const storedColors = localStorage.getItem('colors');
        return storedColors ? JSON.parse(storedColors) : [];
    });


    const [editingColor, setEditingColor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const copyToClipboard = (hex) => {
        navigator.clipboard.writeText(hex).then(() => {
            alert(`Copied ${hex} to clipboard`); 
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleColorUpdate = (newColor, index) => {
        let updatedColors = [...colors];
        if (index !== -1) {
            updatedColors[index] = {...updatedColors[index], hex: newColor};
            setColors(updatedColors);
            localStorage.setItem('colors', JSON.stringify(updatedColors));
        }
    };

    const removeColor = (indexToRemove) => {
        const newColors = colors.filter((_, index) => index !== indexToRemove);
        localStorage.setItem('colors', JSON.stringify(newColors));
        setColors(newColors);
    };

    const editColor = (color) => {
        setEditingColor(color); // Store the hex value of the color being edited
        setIsOpen(true); // Open the modal
    };



    return (
        <div className="myColorsContainer">
            <h1>My Colors</h1>
            <div className="colorsGrid">
                {colors.map((color, index) => (
                    <div key={index} className="colorItem">
                        <div
                            className="colorSquare"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => copyToClipboard(color.hex)}
                        ></div>
                        <div className="colorHex">{color.hex}</div>

                        <div className="editIcon" onClick={() => editColor(color)}> </div>


                        <EditMyColors
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            initialColor={editingColor ? editingColor.hex : '#FFFFFF'} 
                            onColorUpdate={(newColor) => handleColorUpdate(newColor, colors.indexOf(editingColor))}
                        />

                        <div className="deleteIcon" onClick={() => removeColor(index)}>
                            &times;
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyColors;
