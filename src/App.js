import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import ManagerPage from './ManagerPage';
import EmployeePage from './EmployeePage';
import Managermain from './Managermain';
import Employeepagemain from './Employeepagemain';

const App = () => {
  return (
    <div className='app'>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/managermain" element={<Managermain />} />
        <Route path="/employeepagemain" element={<Employeepagemain/>}/>
      </Routes>
    
    </div>
  );
};

export default App;
