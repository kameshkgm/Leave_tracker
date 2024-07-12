const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001;

const { accountSid, authToken, twilioPhoneNumber } = process.env;
const client = twilio(accountSid, authToken);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email, role });
        if (user && user.password === password) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

app.post('/send-message', async (req, res) => {
    const { body, to } = req.body;

    try {
        console.log('Sending message...');
        const message = await client.messages.create({
            body: body,
            from: twilioPhoneNumber,
            to: to
        });
        console.log('Message sent successfully:', message.sid);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
