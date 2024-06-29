import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'; // Import Axios

function App() {
  const [text, setText] = useState('');

  // Function to fetch text from backend
  const fetchText = async () => {
    try {
      const response = await axios.get('https://textcopy-backend.onrender.com/text');
      setText(response.data.text);
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  // Fetch text initially and set up interval for auto-refresh
  useEffect(() => {
    fetchText(); // Initial fetch

    const interval = setInterval(() => {
      fetchText(); // Fetch text every 5 seconds
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount

  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="App">
      <p>{text}</p>
    </div>
  );
}

export default App;
