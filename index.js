const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'Map-view')));

// Serve the index.html file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Map-view', 'index.html'));
});

// Serve the map-view/index.html file
app.get('/Map-view', (req, res) => {
  res.sendFile(path.join(__dirname, 'Map-view', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
