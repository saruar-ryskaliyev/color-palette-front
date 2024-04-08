import Navbar from "./Navbar";
import ColorPicker from "./pages/ColorPicker";
import MyPalettes from "./pages/MyPalettes";
import MyColors from "./pages/MyColors";
import CreatePalette from "./pages/CreatePalette";

import {Route, Routes} from "react-router-dom";

function App(){
    return ( <>
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="/" element={<ColorPicker />} />
                <Route path="/my-palettes" element={<MyPalettes />} />
                <Route path="/my-colors" element={<MyColors />} />
                <Route path="/create-palette" element={<CreatePalette />} />
            </Routes>
        </div>
    </>
    );
}

export default App;