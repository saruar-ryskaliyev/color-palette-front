import React, { useState } from 'react';
import '../MyColors.css';


function MyColors() {
    const [colors, setColors] = useState(() => {
        const storedColors = localStorage.getItem('colors');
        return storedColors ? JSON.parse(storedColors) : [];
    });

    const copyToClipboard = (hex) => {
        navigator.clipboard.writeText(hex).then(() => {
            alert(`Copied ${hex} to clipboard`); 
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    const removeColor = (indexToRemove) => {
        const newColors = colors.filter((_, index) => index !== indexToRemove);
        localStorage.setItem('colors', JSON.stringify(newColors));
        setColors(newColors);
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
