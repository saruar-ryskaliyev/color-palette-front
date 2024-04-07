import './App.css';
import { SketchPicker, AlphaPicker, HuePicker } from 'react-color';
import { useState } from 'react';

function App() {
  const [currentColor, setCurrentColor] = useState("#ff6");
  const handleOnChange = (color) => {
    setCurrentColor(color.hex);
  }

  const appStyle = {
    backgroundColor: currentColor, // Set the entire page background color
    height: "100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  };

  return (

    <div className="App" style={appStyle}>

      <div>
        <SketchPicker 
          color={currentColor}
          onChangeComplete={handleOnChange}
        />

        <AlphaPicker/>
      </div>
    </div>

  );
}

export default App;
