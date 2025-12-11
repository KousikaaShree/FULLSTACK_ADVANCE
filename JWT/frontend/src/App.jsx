import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [food, setFood] = useState([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newDays, setNewDays] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchFood(token);
    }
  }, []);

  const fetchFood = async (token) => {
    try {
      const res = await axios.get('http://localhost:3001/api/food', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFood(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/register', {
        username,
        password
      });
      alert('Registration successful! Please log in.');
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      fetchFood(res.data.token);
    } catch (err) {
      console.error(err);
      alert('Login failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFood([]);
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/food',
        {
          name: newFoodName,
          daysAfterIAte: Number(newDays)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setNewFoodName('');
      setNewDays('');
      fetchFood(token);
    } catch (err) {
      console.error(err);
      alert('Adding food failed.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <h1>Food Tracker</h1>

        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Food Tracker</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Add New Food</h2>
      <form onSubmit={handleAddFood}>
        <input
          type="text"
          placeholder="Food Name"
          value={newFoodName}
          onChange={(e) => setNewFoodName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Days After I Ate"
          value={newDays}
          onChange={(e) => setNewDays(e.target.value)}
          required
        />
        <button type="submit">Add Food</button>
      </form>

      <h2>Your Foods</h2>
      <ul>
        {food.map((f) => (
          <li key={f._id}>
            {f.name} — {f.daysAfterIAte} days
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
