// src/components/NoteManager.jsx
import { useState } from 'react';

function NoteManager({ initialNotes }) {
  const [notes, setNotes] = useState(initialNotes);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = parseFloat(inputValue);
    
    if (note >= 0 && note <= 20) {
      setNotes([...notes, note]);
      setInputValue('');
      setError('');
    } else {
      setError('La note doit être comprise entre 0 et 20');
    }
  };

  const handleDelete = (indexToDelete) => {
    setNotes(notes.filter((_, index) => index !== indexToDelete));
  };

  const calculateAverage = () => {
    if (notes.length === 0) return 0;
    const sum = notes.reduce((acc, note) => acc + note, 0);
    return (sum / notes.length).toFixed(2);
  };

  return (
    <div>
      <h2>Gestionnaire de notes</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Entrez une note (0-20)"
        />
        <button type="submit">Ajouter</button>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            Note {index + 1} : {note} / 20
            <button onClick={() => handleDelete(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
      
      <h3>Moyenne : {calculateAverage()} / 20</h3>
    </div>
  );
}

export default NoteManager;