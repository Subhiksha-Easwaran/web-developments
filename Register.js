 import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/register', {
        email,
        password
      });

      if (res.data.status === 'ok') {
        alert('register successful!');
        navigate('/');
      } else {
        alert(res.data.error || 'register failed');
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={RegisterUser}>
        <h2>Register</h2>
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
        <button type="submit" className="custom-center">Register</button>
      </form>
    </div>
  );
}

export default Register;
