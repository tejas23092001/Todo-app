import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  const apiURL = process.env.REACT_APP_API_URL

  useEffect(() => {
    console.log(apiURL)
    fetch(`${apiURL}/todos/`)
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

    if (todos.some((todo) => todo.description === newTodo)) {
      setError('Todo already exists.');
    } else {
      setError(null);

      fetch(`${apiURL}/todos/`, {
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
