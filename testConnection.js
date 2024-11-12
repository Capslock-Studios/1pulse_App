require('dotenv').config();
const mongoose = require('mongoose');

// Test MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection successful!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });