// src/components/Character.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Character = ({ charname }) => {
  const [characterData, setCharacterData] = useState(null);

  // ดึงข้อมูลตัวละครจาก API
  useEffect(() => {
    axios.post('https://updatedata-10e9.onrender.com/character/get', {
      charname: charname
    })
    .then(response => {
      setCharacterData(response.data);
    })
    .catch(error => {
      console.error('Error fetching character data:', error);
    });
  }, [charname]);

  return (
    <div>
      <h2>Character Information</h2>
      {characterData ? (
        <div>
          <p><strong>Character Name:</strong> {charname}</p>
          <p><strong>Level:</strong> {characterData.data.lv}</p>
          <p><strong>EXP:</strong> {characterData.data.exp}</p>
          <p><strong>Strength:</strong> {characterData.data.str}</p>
          <p><strong>Dexterity:</strong> {characterData.data.dex}</p>
          <p><strong>Money:</strong> {characterData.data.money}</p>
          {/* เพิ่มข้อมูลตัวละครที่ต้องการแสดงได้ที่นี่ */}
        </div>
      ) : (
        <p>Loading character data...</p>
      )}
    </div>
  );
};

export default Character;
