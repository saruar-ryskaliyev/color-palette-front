// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
    }, []);

    const login = (userData) => {
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
        localStorage.clear();
        setUser(null);

    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
