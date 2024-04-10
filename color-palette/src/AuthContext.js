// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data from local storage on initial mount
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
    }, []);

    const login = (userData) => {
        // Store user data and token in local storage
        localStorage.setItem('userData', JSON.stringify({
            token: userData.access_token,
            userId: userData.user_id,
            username: userData.username
        }));
        setUser({
            token: userData.access_token,
            userId: userData.user_id,
            username: userData.username
        });
    };



    const logout = () => {
        localStorage.removeItem('userData');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
