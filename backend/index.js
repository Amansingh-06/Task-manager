const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Define allowed origins
const allowedOrigins = ['http://localhost:5175', 'https://task-manager-uva8.vercel.app'];

// Set up CORS
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g., mobile apps, Postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies and credentials
    })
);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = 8000; // Use PORT from environment variables if available
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
