import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetch('http://localhost:8000/todos/')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = { description: newTodo, completed: false };

    // Check for duplicate before adding
    if (todos.some((todo) => todo.description === newTodo)) {
      setError('Todo already exists.');
    } else {
      // If not a duplicate, clear the error and proceed
      setError(null);

      fetch('http://localhost:8000/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      })
        .then(() => {
          setTodos([...todos, todoData]);
          setNewTodo('');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className='containerStyle'>
      <h1>Todo List</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          required='true'
          value={newTodo}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
