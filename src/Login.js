import React, { useState } from 'react';
import './Login.css'; // Import CSS file

const Login = () => {
  const [role, setRole] = useState('');
  console.log(role);
  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'manager') {
      window.location.href = './manager'; 
    } else if (selectedRole === 'employee') {
      window.location.href = './employee'; 
    }
  };

  return (
    <div className="login-container">
      <div className='cc'>
        <img src="company.jpg" alt="company"/>
      </div>
      <h1 className="company-name">ABC Pvt Ltd</h1>
      <h2 className="portal-text">Leave Application Portal</h2>
      <div className="buttons-container">
        <h3>Login Page</h3>
        <button className="px-2"onClick={() => handleLogin('manager')}>Manager Login</button>
        <button onClick={() => handleLogin('employee')}>Employee Login</button>
      </div>
    </div>
  );
};

export default Login;
