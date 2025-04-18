import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characterData, setCharacterData] = useState(null);
  const [charname, setCharname] = useState("GmEvent");
  const [newCharname, setNewCharname] = useState("");  // สำหรับชื่อใหม่
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // การโหลดข้อมูลตัวละครจาก API
  useEffect(() => {
    if (!charname) return;  // ไม่ให้ทำการค้นหาถ้าไม่มีชื่อ
    setLoading(true);
    axios.post('https://updatedata-10e9.onrender.com/character/get', {
      charname: charname
    })
      .then(response => {
        setCharacterData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching character data:', error);
        setError('Failed to fetch character data');
        setLoading(false);
      });
  }, [charname]);

  // การอัปเดตข้อมูลตัวละคร
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

    setLoading(true);
    axios.post('https://updatedata-10e9.onrender.com/character/update', newCharacterData)
      .then(response => {
        alert('Character updated successfully!');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error updating character:', error);
        alert('Failed to update character');
        setLoading(false);
      });
  };

  // การเปลี่ยนชื่อและค้นหาตัวละครใหม่
  const searchCharacterByName = () => {
    if (newCharname) {
      setCharname(newCharname);  // เปลี่ยนชื่อใหม่เพื่อค้นหา
      setNewCharname("");  // รีเซ็ตช่องกรอกชื่อใหม่
    }
  };

  return (
    <div className="App">
      <h1>Character Data</h1>

      {/* ช่องกรอกชื่อใหม่เพื่อค้นหาตัวละคร */}
      <div>
        <input 
          type="text" 
          value={newCharname} 
          onChange={(e) => setNewCharname(e.target.value)} 
          placeholder="Enter new character name"
        />
        <button onClick={searchCharacterByName} disabled={loading}>
          Search for New Character
        </button>
      </div>

      {/* แสดงข้อมูลตัวละคร */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading character data...</p>
      ) : characterData ? (
        <div>
          <p><strong>Character Name:</strong> {charname}</p>
          <p><strong>Level:</strong> {characterData.data.lv}</p>
          <p><strong>EXP:</strong> {characterData.data.exp}</p>
          <p><strong>Strength:</strong> {characterData.data.str}</p>
          {/* เพิ่มข้อมูลที่ต้องการแสดง */}
        </div>
      ) : (
        <p>No character data available.</p>
      )}

      {/* ปุ่มอัปเดตตัวละคร */}
      <button onClick={updateCharacter} disabled={loading}>
        {loading ? "Updating..." : "Update Character"}
      </button>
    </div>
  );
}

export default App;
