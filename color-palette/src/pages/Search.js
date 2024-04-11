import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';



const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  cursor: pointer;
`;

const SearchTitle = styled.h1`
  /* Add styles for your search title here if needed */
`;

const SearchResultList = styled.ul`
  width: 100%;
  max-width: 600px; // Same as the search container for alignment
  padding: 0;
  margin-top: 20px; // Space between search form and result list
  list-style: none;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; // For aesthetic purposes when items have border radius
`;

const SearchResultItem = styled.li`
  padding: 10px 15px;
  border-bottom: 1px solid #eee; // Subtle separator between items

  &:last-child {
    border-bottom: none; // No border for the last item
  }

  &:hover {
    background-color: #f8f8f8; // Slight change on hover to indicate interactivity
  }

  cursor: pointer;
  transition: background-color 0.2s ease-in-out; // Smooth transition for hover effect
`;

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    const url = `http://localhost:8000/users/search?username=${searchQuery}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data); 
      console.log(data); 
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const handleResultClick = (username, userId) => {
    console.log('Clicked username:', username, 'with ID:', userId); 
    if (userId) {
      navigate(`/my-profile/${userId}`); 
    } else {
      console.error('User ID is undefined'); 
    }
  };

  return (
    <SearchContainer>
      <SearchTitle>Search</SearchTitle>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search by username"
        />
        <SearchButton type="submit">Search</SearchButton>
      </form>
      <SearchResultList>
        {searchResults.map((result, index) => (
          <SearchResultItem key={index} onClick={() => handleResultClick(result.username, result.id)}>
            {result.username || 'No username provided'}
          </SearchResultItem>
        ))}
      </SearchResultList>
    </SearchContainer>
  );
}


