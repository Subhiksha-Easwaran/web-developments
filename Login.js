 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      if (res.data.status === 'ok') {
        alert('Login successful!');
        navigate('/');
      } else {
        alert(res.data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={loginUser}>
        <h2>Login</h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="custom-center">Login</button>
      </form>
    </div>
  );
}

export default Login;
