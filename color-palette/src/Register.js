import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './constants';
import styled from 'styled-components';

const RegisterContainer = styled.div`
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

const StyledLabel = styled.label`
  margin-bottom: 0.5em;
  color: #666;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8em;
  margin-top: 0.2em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.8em;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &.back-button {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #bbb;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #cc0000;
  text-align: center;
  margin-bottom: 1em;
`;

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        handleRegister(username, password);
    };

    const handleRegister = async (username, password) => {
        const url = '/register';
        const details = {
            'username': username,
            'colors': [],
            'palettes': {},
            'password': password
        };

        try {
            const response = await fetch(BASE_URL + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details),
            });

            const result = await response.json();

            if (response.ok) {
                navigate('/login');
            } else if (response.status === 400) {
                setError(result.error || 'Username already exists');
            }
        } catch (error) {
            setError(error.message || 'An error occurred during registration.');
        }
    };

    const handleBack = () => {
        navigate('/login'); // Navigate back to the login page
    };

    return (
        <RegisterContainer>
          <StyledForm onSubmit={handleSubmit}>
            <Title>Register</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div>
              <StyledLabel>Username:</StyledLabel>
              <StyledInput
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <StyledLabel>Password:</StyledLabel>
              <StyledInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <StyledLabel>Confirm Password:</StyledLabel>
              <StyledInput
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <StyledButton type="submit">Register</StyledButton>
            <StyledButton type="button" onClick={handleBack} className="back-button">
              Back to Login
            </StyledButton>
          </StyledForm>
        </RegisterContainer>
      );
    };

export default Register;
