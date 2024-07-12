import React, { useState } from 'react';
import axios from 'axios';
import './Employeepagemain.css';

const Employeepagemain = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const leaveMonthCount = await getLeaveCount(name, 'month');
      const leaveYearCount = await getLeaveCount(name, 'year');

      if (leaveMonthCount >= 2) {
        alert('You cannot take leave. You have already taken 2 leaves this month.');
        return;
      }

      if (leaveYearCount >= 12) {
        alert('You cannot take leave. You have already taken 12 leaves this year.');
        return;
      }

      await axios.post('http://localhost:3002/leave-application', { name, date, reason });
      console.log('Data posted to MongoDB successfully');
      await sendmessage();

      // Clear form fields after successful submission
      setName('');
      setDate('');
      setReason('');
    } catch (error) {
      console.error('Failed to post data to MongoDB:', error);
    }
  };

  const sendmessage = async () => {
    const messageBody = `${name} has requested a leave on ${date} for ${reason}`;
    try {
      const response = await axios.post('http://localhost:3001/send-message', { body: messageBody });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getLeaveCount = async (employeeName, period) => {
    try {
      const response = await axios.get(`http://localhost:3002/leaves-count/${employeeName}/${period}`);
      return response.data.count;
    } catch (error) {
      console.error('Failed to fetch leave count:', error);
      return 0;
    }
  };

  return (
    <div className="employee-page">
      <h2>Employee Leave Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date of Leave:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason for Leave:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Employeepagemain;
