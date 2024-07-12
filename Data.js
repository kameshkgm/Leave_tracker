const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

mongoose.connect('mongodb://localhost:27017/leavetracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const leaveSchema = new mongoose.Schema({
  name: String,
  date: Date,
  reason: String
}, { collection: 'leaves' }); 

const Leave = mongoose.model('Leave', leaveSchema);

app.use(cors()); 
app.use(bodyParser.json());

app.post('/leave-application', async (req, res) => {
  try {
    const { name, date, reason } = req.body;
    const leave = new Leave({ name, date, reason });
    await leave.save();
    res.status(201).json({ message: 'Leave application submitted successfully' });
  } catch (error) {
    console.error('Failed to save leave application:', error);
    res.status(500).json({ error: 'Failed to save leave application' });
  }
});

app.get('/leaves/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const leaveData = await Leave.find({ date: { $gte: startDate, $lte: endDate } });
    res.json(leaveData);
  } catch (error) {
    console.error('Failed to fetch leave data:', error);
    res.status(500).json({ error: 'Failed to fetch leave data' });
  }
});


app.get('/leaves-count/:employeeName/:period', async (req, res) => {
    try {
      const { employeeName, period } = req.params;
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1; // January is 0
  
      let startDate, endDate;
      if (period === 'month') {
        startDate = new Date(currentYear, currentMonth - 1, 1); 
        endDate = new Date(currentYear, currentMonth, 0); 
      } else if (period === 'year') {
        startDate = new Date(currentYear, 0, 1); 
        endDate = new Date(currentYear, 11, 31);
      } else {
        return res.status(400).json({ error: 'Invalid period specified. Must be "month" or "year".' });
      }
  
      const leaveCount = await Leave.countDocuments({ name: employeeName, date: { $gte: startDate, $lte: endDate } });
      res.json({ count: leaveCount });
    } catch (error) {
      console.error('Failed to fetch leave count:', error);
      res.status(500).json({ error: 'Failed to fetch leave count' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
