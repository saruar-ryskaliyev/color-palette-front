import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { BASE_URL } from './constants';




const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, login } = useAuth(); // Assuming 'user' holds the current user session information



    const handleLogin = async (username, password) => {
        const url = '/token';

        const details = {
            'username': username,
            'password': password,
            'grant_type': 'password' 
        };

        const formBody = [];
        for (const property in details) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        const bodyString = formBody.join("&");





        try{
            const response = await fetch(BASE_URL + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: bodyString,
            });

            
            const result = await response.json();
            if (response.ok) {
                login(result);
                navigate('/');
            } else {
                setError(result.error || 'An error occurred during login.');
            }
        } catch (error) {
            setError(error.message || 'An error occurred during login.');
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to the registration page
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Both fields are required');
            return;
        }
        handleLogin(username, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {/* Check if user is not logged in then show Register button */}
                {!user && (
                    <button type="button" onClick={handleRegister} className="register-button">
                        Register
                    </button>
                )}
            </form>
        </div>
    );
};

export default Login;
