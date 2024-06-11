// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post('http://localhost:5000/items/add', { name, description });
      fetchItems();
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TODO Task Manager</h1>
      </header>
      <main>
        <div className="task-input">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <button onClick={addItem}>Add Task</button>
        </div>
        <ul className="task-list">
          {items.map(item => (
            <li key={item._id}>
              <div className="task-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
