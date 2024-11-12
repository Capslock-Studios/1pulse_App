const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multerGridFsStorage = require('multer-gridfs-storage');
const path = require('path');

const app = express();
const port = 3000;

// Create a MongoDB connection and GridFS instance
const mongoURI = 'mongodb://localhost:27017/your-database-name';  // Use your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;
let gfs;

// Wait for MongoDB connection and initialize GridFS
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');  // Specify the collection for files
  console.log('MongoDB and GridFS connected');
});

// Configure multer to use GridFS for file storage
const storage = new multerGridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      bucketName: 'uploads',  // The name of the GridFS collection
      filename: file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    };
  },
});

const upload = multer({ storage });

// Set up a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.status(200).json({
    file: req.file,
  });
});

// Set up a route to serve the uploaded image
app.get('/image/:filename', (req, res) => {
  const file = gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err || !file) {
      return res.status(404).send('File not found');
    }

    // Check if the file is an image
    if (file.contentType.startsWith('image')) {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(400).send('Not an image file');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
