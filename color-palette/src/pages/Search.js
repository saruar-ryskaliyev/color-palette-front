import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search by username"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => handleResultClick(result.username, result.id)} style={{ cursor: 'pointer' }}>
            {result.username || 'No username provided'}
          </li>
        ))}
      </ul>
    </div>
  );
}
