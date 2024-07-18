const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection setup
const connectDB = require('./server/config/db');
connectDB();

// Import routes
const mainRoutes = require('./server/routes/main');
const exerciseRoutes = require('./server/routes/exercise');

// Use routes
app.use('/', mainRoutes);
app.use('/', exerciseRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
