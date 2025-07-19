 import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

function Home() {
  return (
    <div className="nav-bar">
      
        <Link className="nav-link" to="/login">Login</Link> | 
        <Link className="nav-link" to="/register">Register</Link>
      </div>
 
  
  );
}

export default Home;