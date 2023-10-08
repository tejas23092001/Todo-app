import React, { useEffect, useState } from 'react';

const containerStyle = {
  textAlign: 'center',

  padding: '20px',
  width: '50%',
  margin: "20px"
};

const formStyle = {
  margin: '20px',
};

const listStyle = {
  listStyle: 'none',
  padding: '0',
};

const itemStyle = {
  border: '1px solid #ccc',
  margin: '5px',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

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
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgb(203, 195, 227)",
    }}>

      <div style={containerStyle}>
        <h1>Todo List</h1>
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <ul style={listStyle}>
          {todos.map((todo) => (
            <li key={todo._id} style={itemStyle}>
              {todo.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
