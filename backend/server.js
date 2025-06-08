require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware to handle CORS
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        
        credentials: true, // Allow credentials (cookies)
    }
));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/income',incomeRoutes);
app.use('/api/v1/expense',expenseRoutes);
app.use('/api/v1/dashboard',dashboardRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname,"uploads")));

app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Server is running on port ${PORT}`);
=======
    console.log(`Server is running on port ${PORT}`); 
>>>>>>> 880ffab (On Linux)
});