import React, { useState } from 'react';
import axios from 'axios';
import './EmployeePage.css';

const Employeepage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password, role: 'employee' });
      if (response.data.success) {
        window.location.href = '/employeepagemain';
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className="employee-page-container">
      <div className="employee-page-content">
        <h2 className="employee-page-title">Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="employee-form-group">
            <label className="employee-form-label">Email:</label>
            <input
              type="email"
              className="employee-form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="employee-form-group">
            <label className="employee-form-label">Password:</label>
            <input
              type="password"
              className="employee-form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="employee-form-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Employeepage;
