import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { BASE_URL } from './constants';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const StyledForm = styled.form`
  background: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  margin-bottom: 0.5em;
  color: #666;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8em;
  margin-top: 0.2em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.25);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8em;
  border: none;
  border-radius: 4px;
  background-color: #0056b3;
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004494;
  }

  &.register-button {
    background-color: #4CAF50;
    margin-top: 1em;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #cc0000;
  text-align: center;
  margin-bottom: 1em;
`;

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





        try {
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
        <LoginContainer>
          <StyledForm onSubmit={handleSubmit}>
            <Title>Login</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div>
              <Label>Username:</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Password:</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Login</Button>
            {!user && (
              <Button type="button" onClick={handleRegister} className="register-button">
                Register
              </Button>
            )}
          </StyledForm>
        </LoginContainer>
      );
    };

export default Login;
