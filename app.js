const express = require('express');
const mongoose = require('mongoose');

const User_route = require('./Route/User_route');
const Part_route = require('./Route/Part_route');

const app = express();

// Middleware
app.use(express.json());

// CORS headers support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/users', User_route);
app.use('/parts', Part_route);

// Root route check
app.get('/', (req, res) => {
  res.status(200).send('Vehicle & Technical Parts API Backend is running');
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tech_store';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });