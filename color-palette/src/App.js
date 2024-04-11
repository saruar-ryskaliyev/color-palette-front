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
import MyProfile from './pages/MyProfile';
import Search from './pages/Search';

const App = () => {
    const { user } = useAuth();

    const privateRoutes = (
        <>
            <Route path="/" element={<ColorPicker />} />
            <Route path="/my-palettes" element={<MyPalettes />} />
            <Route path="/my-colors" element={<MyColors />} />
            <Route path="/create-palette" element={<CreatePalette />} />
            <Route path="/create-palette/:paletteName" element={<CreatePalette />} />
            <Route path='/search' element={<Search />} />
            <Route path="/my-profile/:user_id" element={<MyProfile />} />
            {/* Redirect any other path to the main page */}
            <Route path="*" element={<Navigate to="/" />} />
        </>
    );

    const publicRoutes = (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-profile/:user_id" element={<MyProfile />} />
            {/* Redirect any other path to the login page */}
            <Route path="*" element={<Navigate to="/login" />} />
        </>
    );

    return (
        <Router>
            <div className="container">
                {user && <Navbar />}
                <Routes>
                    {user ? privateRoutes : publicRoutes}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
