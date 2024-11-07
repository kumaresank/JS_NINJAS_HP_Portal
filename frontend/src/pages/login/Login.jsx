import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      const response = await axios.post('https://hp-portal.vercel.app/api/auth/login', {
        email,
        password,
      });

      if (response.data) {
        sessionStorage.setItem('jwtToken', response.data.token);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('firstName', response.data.userId);
        sessionStorage.setItem('lastName', response.data.userId);
        navigate("/dashboard");
        onClose();
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span class="close-btn" onClick={onClose}>x</span>
        <div class="logo">
          <img src="https://www.bayer.com/themes/custom/bayer_cpa/logo.svg" width="80" alt="Bayer Healthcare Logo" />
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div class="login-links">
          <a href="#">Forgot Password?</a>
          <br />
          <a href="#">New User? Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
