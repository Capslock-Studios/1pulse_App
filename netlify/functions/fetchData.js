const connectToDatabase = require('./dbConnect');
const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  await connectToDatabase();

  // Sample data fetch (or any MongoDB operation)
  const sampleData = { message: "MongoDB connected!" };
  
  return {
    statusCode: 200,
    body: JSON.stringify(sampleData),
  };
};
