require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

// Connect to Database
connectDB();

// Initialize Express framework
const app = express();

// Global Middleware
app.use(cors()); // 2. Enable CORS for all incoming requests
app.use(express.json()); // Parse JSON bodies

// Mount routes here
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the Fitness API' });
});

// Define the port (Aligned to your .env setup)
const PORT = process.env.PORT || 4002;
console.log("Environment Port:", process.env.PORT);
console.log("Listening Port:", PORT);

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API is now online on port ${process.env.NODE_ENV || 4002}`);
  });
}

module.exports = { app, mongoose };
