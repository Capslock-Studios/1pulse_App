const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://sibonizulu:<2bbd06afqUE#>@clusterzero.my0bf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterZero'; // Local database

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = mongoose;
