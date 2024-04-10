import { useState, useCallback } from 'react';
import { ChromePicker } from 'react-color';
import _ from 'lodash';
import { BASE_URL } from '../constants';


function ColorPicker({ onAddColor }) {





  const [currentColor, setCurrentColor] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });
  const [showNiceMessage, setShowNiceMessage] = useState(false);

  const handleColorChange = useCallback(_.throttle((color) => {
    setCurrentColor(color.rgb);
  }, 100), []); 

  const handleAddColor = async () => {
    const hexColor = `#${((1 << 24) + (currentColor.r << 16) + (currentColor.g << 8) + currentColor.b).toString(16).slice(1)}`;


    const existingColors = JSON.parse(localStorage.getItem('colors')) || [];
    const userData = JSON.parse(localStorage.getItem('userData'));
    const user_id = userData.userId;
    const token = userData.token;

    const queryParams = new URLSearchParams({ color: hexColor.replace('#', '') }).toString();


    try {

      const response = await fetch(`${BASE_URL}/users/${user_id}/colors?${queryParams}`, {
        method: 'POST',
        headers: {
        'accept' : 'application/json',
        'Authorization': `Bearer ${token}`}
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {


        localStorage.setItem('colors', JSON.stringify([...existingColors, { hex: hexColor}]));


        setShowNiceMessage(true);
        setTimeout(() => {
          setShowNiceMessage(false);
        }, 2000);
      } else {
        console.log(result.error);
      }



    } catch (error) {
      console.error(error);
    }

  

  };
  
  


  const styleButton = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',


  }

  const appStyle = {
    backgroundColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`,
    height: "100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  };

  const messageStyle = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '6em',
    color: 'white',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    opacity: showNiceMessage ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    pointerEvents: 'none',  // Makes it non-interactive
    zIndex: 1000  // Ensures it is on top
  };

  return (
    <div className="App" style={appStyle}>
      <div>
        <h1>Color Palette</h1>
        <ChromePicker 
          color={currentColor}
          onChange={handleColorChange}
        />
        <button onClick={handleAddColor} style={styleButton}>Add Color</button>
        {showNiceMessage && <div style={messageStyle}>Added to your colors</div>}
      </div>
    </div>
  );
}

export default ColorPicker;
