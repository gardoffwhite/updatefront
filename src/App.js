import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characterData, setCharacterData] = useState(null);
  const [charname, setCharname] = useState("GmEvent");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // เรียก API จาก Render ที่ถูก deploy แล้ว
    setLoading(true); // เริ่มโหลดข้อมูล
    axios.post('https://updatedata-10e9.onrender.com/character/get', {
      charname: charname
    })
    .then(response => {
      setCharacterData(response.data);
      setLoading(false); // หยุดโหลดข้อมูล
    })
    .catch(error => {
      console.error('Error fetching character data:', error);
      setError('Failed to fetch character data');
      setLoading(false); // หยุดโหลดข้อมูล
    });
  }, [charname]);

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

    setLoading(true); // เริ่มโหลดเมื่อมีการอัปเดต
    axios.post('https://updatedata-10e9.onrender.com/character/update', newCharacterData)
      .then(response => {
        alert('Character updated successfully!');
        setLoading(false); // หยุดโหลดข้อมูล
      })
      .catch(error => {
        console.error('Error updating character:', error);
        alert('Failed to update character');
        setLoading(false); // หยุดโหลดข้อมูล
      });
  };

  const renameCharacter = () => {
    // ฟังก์ชันนี้จะเปลี่ยนชื่อในการค้นหาข้อมูลเท่านั้น
    axios.post('https://updatedata-10e9.onrender.com/character/rename_search', {
      charname: charname,
      new_name: newName
    })
      .then(response => {
        alert('Character name for search updated!');
        setCharname(newName);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error renaming character for search:', error);
        alert('Failed to update character name for search');
        setLoading(false);
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

      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name for search"
        />
        <button onClick={renameCharacter} disabled={loading}>
          {loading ? "Renaming..." : "Rename for Search"}
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
        </div>
      ) : (
        <p>No character data available.</p>
      )}
    </div>
  );
}

export default App;
