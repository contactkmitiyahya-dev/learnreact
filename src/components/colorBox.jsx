// src/components/ColorBox.jsx
import { useState } from 'react';

function ColorBox({ initialColor }) {
  const [color, setColor] = useState(initialColor);

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <div style={{
        width: '200px',
        height: '200px',
        backgroundColor: color,
        border: '2px solid black',
        margin: '10px auto',
        transition: 'background-color 0.3s ease'
      }} />
      <button onClick={generateRandomColor}>
        Changer de couleur
      </button>
      <p>Couleur actuelle : {color}</p>
    </div>
  );
}

export default ColorBox;