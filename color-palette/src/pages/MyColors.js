import React, { useState, useEffect } from 'react';
import '../MyColors.css';
import { EditMyColors } from './EditMyColors';
import { BASE_URL } from '../constants';


function MyColors() {



    const [colors, setColors] = useState(() => {
        const storedColors = localStorage.getItem('colors');
        return storedColors ? JSON.parse(storedColors) : [];
    });



    const [editingColor, setEditingColor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        
        fetchColors();
    }, []);



    const fetchColors = async () => {


        const userData = JSON.parse(localStorage.getItem('userData'));
        const user_id = userData.userId;
    
        try {
            const response = await fetch(`${BASE_URL}/users/${user_id}/colors`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'},
            });

            const result = await response.json();

            if (response.ok) {
                setColors(result.colors.map(colorCode => {
                    const hex = colorCode.startsWith('#') ? colorCode : `#${colorCode}`;
                    return { hex };
                }));
            } else {
                console.error('Error fetching colors:', result.error);
            }

        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };
    



    const copyToClipboard = (hex) => {
        navigator.clipboard.writeText(hex).then(() => {
            alert(`Copied ${hex} to clipboard`); 
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleColorUpdate = async(newColor, index) => {

        let updatedColors = [...colors];
        if (index !== -1) {

            const userData = JSON.parse(localStorage.getItem('userData'));
            const user_id = userData.userId;
            const token = userData.token;
            const colorHex = colors[index].hex.replace('#', '');



            updatedColors[index] = { hex: newColor };


            try {
                const response = await fetch(`${BASE_URL}/users/${user_id}/colors/${colorHex}/${updatedColors[index].hex.replace('#','')}`, {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'},
                    body: JSON.stringify({ color: newColor.replace('#', '')}),
                });

                const result = await response.json();
                if (response.ok) {



                    setColors(updatedColors);
                    localStorage.setItem('colors', JSON.stringify(updatedColors));



                }
                else {
                    console.error('Error updating color:', result.error);
                }
            } catch (error) {
                console.error('Error updating color:', error);
            }


            
        }
    };

    const removeColor = async(indexToRemove) => {


        const userData = JSON.parse(localStorage.getItem('userData'));

        const user_id = userData.userId;
        const color = colors[indexToRemove];
        const token = userData.token;

        const colorHex = colors[indexToRemove].hex.replace('#', '');



        try {
            const response = await fetch(`${BASE_URL}/users/${user_id}/colors/${colorHex}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`},
            });


            const result = await response.json();
            if (response.ok) {


                const updatedColors = colors.filter((_, index) => index !== indexToRemove);
                setColors(updatedColors);
                localStorage.setItem('colors', JSON.stringify(updatedColors));


            }
            else {
                console.error('Error deleting color:', result.error);
            }
        } catch (error) {
            console.error('Error deleting color:', error);
        }


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
