import { useState, useCallback } from 'react';
import { SketchPicker, HuePicker, AlphaPicker } from 'react-color';
import _ from 'lodash';

function App() {
  const [currentColor, setCurrentColor] = useState({
    r: 255,
    g: 255,
    b: 102,
    a: 1
  });


  const handleColorChange = useCallback(_.throttle((color) => {
    setCurrentColor(color.rgb);
  }, 100), []); 

  const handleHueChange = useCallback(_.throttle((color) => {
    setCurrentColor(current => ({
      ...current,
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b
    }));
  }, 100), []);

  const handleAlphaChange = useCallback(_.throttle((color) => {
    setCurrentColor(current => ({
      ...current,
      a: color.rgb.a
    }));
  }, 100), []);

  const appStyle = {
    backgroundColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`,
    height: "100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  };

  const pickerContainerStyle = {
    marginTop: '20px',
  };

  return (
    <div className="App" style={appStyle}>
      <div>
        <h1>Color Palette</h1>
        <SketchPicker 
          color={currentColor}
          onChange={handleColorChange}
        />
        <div style={pickerContainerStyle}>
          <h2>Hue Picker</h2>
          <HuePicker
            color={currentColor}
            onChange={handleHueChange}
            width="90%"
          />
        </div>
        <div style={pickerContainerStyle}>
          <h2>Alpha Picker</h2>
          <AlphaPicker
            color={currentColor}
            onChange={handleAlphaChange}
            width="90%"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
