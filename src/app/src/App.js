import React, { useEffect, useState } from 'react';
import TodoList from './components/todoList.js';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiURL}/todos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => {
        setError('Failed to fetch todos.');
        console.error(error);
      });
  }, [apiURL]);

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

      fetch(`${apiURL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setTodos([...todos, data]);
          setNewTodo('');
        })
        .catch((error) => {
          setError('Failed to add a new todo.');
          console.error(error);
        });
    }
  };

  return (
    <div className="containerStyle">
      <h1>Todo List</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          required={true}
          value={newTodo}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
