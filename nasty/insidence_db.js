const mongoose = require('mongoose');

// Create a schema for the incident data
const incidentSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String,
  date: String,
  time: String,
  location: {
    type: [Number], // [longitude, latitude]
    required: true
  },
  imageId: mongoose.Schema.Types.ObjectId, // Store the image file's ObjectId
  email: String,
  phone: String,
  idPassport: String,
});

// Create the model based on the schema
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
