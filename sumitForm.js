const Incident = require('./incidentModel');  // Import the Incident model

function submitForm(lat, lng, address) {
  const type = document.getElementById('incidentType').value;
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const idPassport = document.getElementById('idPassport').value;
  const imageUrl = ''; // Handle image upload if needed

  // Create a new Incident document
  const newIncident = new Incident({
    type,
    name,
    description,
    date,
    time,
    location: [lng, lat],  // Store longitude first, then latitude
    imageUrl,
    email,
    phone,
    idPassport
  });

  // Save the incident to MongoDB
  newIncident.save()
    .then(() => {
      console.log('Incident saved to database');
    })
    .catch((err) => {
      console.error('Error saving incident:', err);
    });

  // Create and add the marker to the map (this can remain the same)
  const icon = icons[type];
  const marker = L.marker([lat, lng], { icon }).addTo(map);
  marker.bindPopup(`
    <strong>${type}</strong><br>
    <em>${date} ${time}</em><br>
    ${description}<br>
    <p>Submitted by: ${name}</p>
    <p>Location: ${address}</p>
  `);

  map.closePopup(); // Close form popup after submission
}



const Incident = require('./incidentModel');  // Import the Incident model
const multer = require('multer');

function submitForm(lat, lng, address) {
  const type = document.getElementById('incidentType').value;
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const idPassport = document.getElementById('idPassport').value;
  const image = document.getElementById('image').files[0];

  // Create a new Incident document with imageId
  const newIncident = new Incident({
    type,
    name,
    description,
    date,
    time,
    location: [lng, lat],  // Store longitude first, then latitude
    imageId: image._id,  // Use the image's ObjectId after uploading
    email,
    phone,
    idPassport
  });

  // Save the incident to MongoDB
  newIncident.save()
    .then(() => {
      console.log('Incident saved to database');
    })
    .catch((err) => {
      console.error('Error saving incident:', err);
    });
}
