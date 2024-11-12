const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: [Number], // [longitude, latitude]
    required: true
  },
  imageUrl: { type: String },
  name: { type: String, required: true }
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
