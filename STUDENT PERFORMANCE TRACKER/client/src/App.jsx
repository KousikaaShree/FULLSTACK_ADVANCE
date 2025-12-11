// import { useState } from 'react'
// import './App.css'

// function App() {

// }

// export default App

import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [form, setForm] = useState({});
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [performance, setPerformance] = useState([]);

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ------------- AUTH -------------
  async function login() {
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setPage("dashboard");
    } catch {
      alert("Invalid credentials");
    }
  }

  async function register() {
    await api.post("/register", form);
    alert("Registered! Please login.");
    setPage("login");
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  }

  // ------------ STUDENTS ------------
  async function loadStudents() {
    const res = await api.get("/students", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(res.data);
  }

  async function addStudent() {
    await api.post("/students", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadStudents();
  }

  async function deleteStudent(id) {
    await api.delete(`/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadStudents();
  }

  async function viewStudent(s) {
    setStudent(s);

    const res = await api.get(`/performance/${s._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPerformance(res.data);
    setPage("detail");
  }

  // ------------ PERFORMANCE ------------
  async function addPerformance() {
    await api.post(
      "/performance",
      {
        studentId: student._id,
        subject: form.subject,
        marks: form.marks,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    viewStudent(student);
  }

  useEffect(() => {
    if (token) loadStudents();
  }, [token]);

  // ===================== PAGES =============================

  if (!token && page === "login")
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={updateForm} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updateForm}
        />
        <button onClick={login}>Login</button>
        <p>
          New user?{" "}
          <span style={{ color: "blue" }} onClick={() => setPage("register")}>
            Register
          </span>
        </p>
      </div>
    );

  if (page === "register")
    return (
      <div style={{ padding: 20 }}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={updateForm} />
        <input name="email" placeholder="Email" onChange={updateForm} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updateForm}
        />
        <button onClick={register}>Create Account</button>
        <p>
          Have account?{" "}
          <span style={{ color: "blue" }} onClick={() => setPage("login")}>
            Login
          </span>
        </p>
      </div>
    );

  if (page === "dashboard")
    return (
      <div style={{ padding: 20 }}>
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>

        <h3>Add Student</h3>
        <input name="name" placeholder="Name" onChange={updateForm} />
        <input name="rollNo" placeholder="Roll No" onChange={updateForm} />
        <input name="className" placeholder="Class" onChange={updateForm} />
        <button onClick={addStudent}>Add</button>

        <h3>Students</h3>
        {students.map((s) => (
          <div key={s._id} style={{ marginTop: 10 }}>
            {s.name} - {s.rollNo}
            <button onClick={() => viewStudent(s)}>View</button>
            <button onClick={() => deleteStudent(s._id)}>Delete</button>
          </div>
        ))}
      </div>
    );

  if (page === "detail")
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setPage("dashboard")}>Back</button>
        <h2>{student.name}</h2>

        <h3>Add Performance</h3>
        <input name="subject" placeholder="Subject" onChange={updateForm} />
        <input name="marks" placeholder="Marks" onChange={updateForm} />
        <button onClick={addPerformance}>Add</button>

        <h3>Performance</h3>
        {performance.map((p) => (
          <div key={p._id}>
            {p.subject}: {p.marks}
          </div>
        ))}
      </div>
    );
}

