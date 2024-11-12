const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const connection = mongoose.connection;
let gfs;

connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('fs'); // Use the 'fs' collection to store GridFS files
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file when accessing the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get all incidents from the database
app.get('/get-incidents', async (req, res) => {
  try {
    // Assuming you have an Incident model defined
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
