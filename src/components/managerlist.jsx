import { useState } from 'react';

function ListManager({ initialItems, placeholder }) {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (indexToDelete) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div>
      <h3>Liste des éléments :</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDelete(index)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default ListManager;