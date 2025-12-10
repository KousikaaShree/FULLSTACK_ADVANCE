import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todoList, setTodoList] = useState([]);

  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDate, setEditDate] = useState("");

  // Load all todos
  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((res) => {
      setTodoList(res.data);
    });
  }, []);

  // Add new todo
  const addTodo = () => {
    if (!title) return alert("Title is required!");

    axios
      .post("http://localhost:3001/todos", {
        title,
        description,
        dueDate,
      })
      .then(() => {
        alert("Todo added!");
        window.location.reload();
      });
  };

  // Update todo
  const updateTodo = (id) => {
    axios
      .put(`http://localhost:3001/todos/${id}`, {
        title: editTitle,
        description: editDesc,
        dueDate: editDate,
        isCompleted: false,
      })
      .then(() => {
        alert("Todo updated!");
        window.location.reload();
      });
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`).then(() => {
      alert("Todo deleted!");
      window.location.reload();
    });
  };

  return (
    <div className="container">
      <h1>Todo App (MERN)</h1>

      {/* ADD TODO */}
      <div className="add-section">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <hr />

      {/* TODO LIST */}
      <h2>Todo List</h2>
      <div className="todo-list">
        {todoList.map((todo) => (
          <div key={todo._id} className="todo-card">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p><b>Due:</b> {todo.dueDate ? todo.dueDate.substring(0, 10) : "No date"}</p>

            <input
              type="text"
              placeholder="Edit title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Edit description"
              onChange={(e) => setEditDesc(e.target.value)}
            />
            <input
              type="date"
              onChange={(e) => setEditDate(e.target.value)}
            />

            <button onClick={() => updateTodo(todo._id)}>Update</button>
            <button className="delete" onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
