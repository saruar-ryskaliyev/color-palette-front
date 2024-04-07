import { useState, useCallback } from 'react';
import { ChromePicker} from 'react-color';
import _ from 'lodash';

function App() {
  const [currentColor, setCurrentColor] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });

  const handleColorChange = useCallback(_.throttle((color) => {
    setCurrentColor(color.rgb);
  }, 100), []); 


  const appStyle = {
    backgroundColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`,
    height: "100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  };

  return (
    <div className="App" style={appStyle}>
      <div>
        <h1>Color Palette</h1>
        <ChromePicker 
          color={currentColor}
          onChange={handleColorChange}
        />
    
      </div>
    </div>
  );
}

export default App;