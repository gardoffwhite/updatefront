import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characterData, setCharacterData] = useState(null);
  const [charname, setCharname] = useState("GmEvent");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch character data when charname changes
  useEffect(() => {
    setLoading(true); // Start loading
    axios.post('https://updatedata-10e9.onrender.com/character/get', { charname: charname })
      .then(response => {
        setCharacterData(response.data); // Set character data
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching character data:', error.response || error);
        setError('Failed to fetch character data');
        setLoading(false); // Stop loading
      });
  }, [charname]);

  // Update character data
  const updateCharacter = () => {
    const newCharacterData = {
      charname: charname,
      new_data: {
        lv: 500,
        exp: 9999,
        str: 5000,
        dex: 5000
      }
    };

    setLoading(true); // Start loading for update
    axios.post('https://updatedata-10e9.onrender.com/character/update', newCharacterData)
      .then(response => {
        alert('Character updated successfully!');
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error updating character:', error.response || error);
        alert('Failed to update character');
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="App">
      <h1>Character Data</h1>
      <div>
        <input 
          type="text" 
          value={charname} 
          onChange={(e) => setCharname(e.target.value)} 
          placeholder="Enter character name"
        />
        <button onClick={updateCharacter} disabled={loading}>
          {loading ? "Updating..." : "Update Character"}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading character data...</p>
      ) : characterData ? (
        <div>
          <p><strong>Character Name:</strong> {charname}</p>
          <p><strong>Level:</strong> {characterData.data.lv}</p>
          <p><strong>EXP:</strong> {characterData.data.exp}</p>
          <p><strong>Strength:</strong> {characterData.data.str}</p>
          {/* Add additional character data display here */}
        </div>
      ) : (
        <p>No character data available.</p>
      )}
    </div>
  );
}

export default App;
