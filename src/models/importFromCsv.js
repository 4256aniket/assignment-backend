import mongoose from 'mongoose';
import csvtojson from 'csvtojson';
import dotenv from 'dotenv';
import { Component } from '../models/component.model.js'; // Your Mongoose model
dotenv.config();

// MongoDB URI from environment variable
const mongoURL = process.env.MONGO_URI;

// Path to the CSV file
const csvFilePath = "/Users/aniketkumar/Desktop/bmw/bmw-assignment-backend/src/models/data.csv";

(async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB with Mongoose');

    // Convert CSV to JSON
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    // Insert the data using Mongoose
    const result = await Component.insertMany(jsonArray);
    console.log(`${result.length} records inserted successfully.`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the Mongoose connection
    await mongoose.disconnect();
  }
})();
