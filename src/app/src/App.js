import React, { useEffect, useState } from 'react';
import TodoList from './components/todoList';
import './App.css';
import axios from './utils/axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

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

      axios
        .post('/todos', todoData)
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

  useEffect(() => {
    axios
      .get('/todos')
      .then((data) => setTodos(data))
      .catch((error) => {
        setError('Failed to fetch todos.');
        console.error(error);
      });
  }, []);

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
