const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  type: String,
  name: String,
  description: String,
  date: String,
  time: String,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  imageId: mongoose.Schema.Types.ObjectId,
  phone: String,
  idPassport: String
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
