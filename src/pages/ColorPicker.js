import { useState, useCallback } from 'react';
import { ChromePicker } from 'react-color';
import _ from 'lodash';

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

  const handleAddColor = () => {
    const hexColor = `#${((1 << 24) + (currentColor.r << 16) + (currentColor.g << 8) + currentColor.b).toString(16).slice(1)}`;

    const existingColors = JSON.parse(localStorage.getItem('colors')) || [];

    // Check if the color already exists
    if (existingColors.some(color => color.hex === hexColor)) {
      alert('You already have this color in your library.'); // You can change this to a nicer notification if you prefer
      return;
    }

    localStorage.setItem('colors', JSON.stringify([...existingColors, { hex: hexColor }]));
    
    setShowNiceMessage(true);
    setTimeout(() => {
      setShowNiceMessage(false); // Hide message
    }, 2000); // Message shows for 2 seconds
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
