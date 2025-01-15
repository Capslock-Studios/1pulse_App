require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const Grid = require('gridfs-stream');
const Incident = require('./models/incident');  // Import the Incident model

console.log("MongoDB URI:", process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB, all is well!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectToDB();

const connection = mongoose.connection;
let gfs;

// GridFS setup (for handling large files)
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('fs'); // 'fs' collection is used for GridFS files
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the map-view/index.html file
app.get('/Map-view', (req, res) => {
  res.sendFile(path.join(__dirname, 'map-view', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Endpoint to get all incidents from the database
app.get('/get-incidents', async (req, res) => {
  try {
    const incidents = await Incident.find({});
    res.status(200).json(incidents);
  } catch (err) {
    console.error("Error fetching incidents:", err);
    res.status(500).send('Error fetching incidents.');
  }
});

// Endpoint to get an image from GridFS by imageId
app.get('/get-image/:imageId', async (req, res) => {
  const { imageId } = req.params;

  gfs.files.findOne({ _id: mongoose.Types.ObjectId(imageId) }, (err, file) => {
    if (err || !file) {
      return res.status(404).send('Image not found');
    }

    const readstream = gfs.createReadStream(file.filename);
    res.set('Content-Type', file.contentType);
    readstream.pipe(res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
