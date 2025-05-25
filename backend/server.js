const PORT = process.env.PORT;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();


// Middleware to handle CORS
app.use(cors(
    {
        // origin: process.env.CLIENT_URL,
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        // credentials: true,
    }
));
app.use(express.json());

connectDB();

app.use('/api/v1/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});