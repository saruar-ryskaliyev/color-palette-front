import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import ColorPicker from './pages/ColorPicker';
import MyPalettes from './pages/MyPalettes';
import MyColors from './pages/MyColors';
import CreatePalette from './pages/CreatePalette';
import Login from './Login';
import Register from './Register';

const App = () => {
    const { user } = useAuth();

    return (
        <Router>
            <div className="container">
                {user && <Navbar />}
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<ColorPicker />} />
                            <Route path="/my-palettes" element={<MyPalettes />} />
                            <Route path="/my-colors" element={<MyColors />} />
                            <Route path="/create-palette" element={<CreatePalette />} />
                            <Route path="/create-palette/:paletteName" element={<CreatePalette />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
